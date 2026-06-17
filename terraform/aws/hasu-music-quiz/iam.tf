data "aws_iam_policy_document" "github_actions_assume_role" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github_actions.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = [local.github_subject]
    }
  }
}

resource "aws_iam_role" "github_actions_deploy" {
  name               = var.github_actions_role_name
  assume_role_policy = data.aws_iam_policy_document.github_actions_assume_role.json
  description        = "Allows hasu-music-quiz GitHub Actions to deploy backend through AWS Systems Manager."
}

data "aws_iam_policy_document" "backend_deploy" {
  statement {
    sid = "SendCommandToBackendInstance"

    actions = [
      "ssm:SendCommand",
    ]

    resources = [
      local.ssm_document_arn,
      local.ssm_managed_instance_arn,
    ]
  }

  statement {
    sid = "ReadCommandStatus"

    actions = [
      "ssm:ListCommandInvocations",
    ]

    resources = ["*"]
  }

  statement {
    sid = "UploadAndDeleteDeploymentArtifacts"

    actions = [
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:PutObject",
    ]

    resources = ["${aws_s3_bucket.backend_deploy_artifacts.arn}/backend/*"]
  }
}

resource "aws_iam_role_policy" "backend_deploy" {
  name   = "backend-deploy"
  role   = aws_iam_role.github_actions_deploy.id
  policy = data.aws_iam_policy_document.backend_deploy.json
}
