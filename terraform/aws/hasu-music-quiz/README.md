# hasu-music-quiz AWS Infrastructure

Creates the GitHub Actions OIDC role and temporary deployment artifact bucket
used by `Romira915/hasu-music-quiz`.

The role trust policy allows only:

```text
repo:Romira915/hasu-music-quiz:ref:refs/heads/main
```

Apply:

```bash
terraform init
terraform plan
terraform apply
```

Expected workflow values:

```text
AWS_ROLE_TO_ASSUME=arn:aws:iam::616657986447:role/hasu-music-quiz_github_actions_deploy_role
BACKEND_ARTIFACT_BUCKET=hasu-music-quiz-backend-deploy-616657986447
```
