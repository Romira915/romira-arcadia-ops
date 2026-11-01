import { l as normalizeOptionalString } from "./string-coerce-1VuiLaaR.mjs";
import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { o as racePromiseWithAbortSignal } from "./src-D1BHGNTj.mjs";
import { t as formatErrorMessage } from "./errors-BvOkmQM5.mjs";
import { r as isIncognitoSessionKey } from "./session-key-CmZ4o9-l.mjs";
import { a as resolveAgentDir } from "./agent-scope-config-BEk6-ThS.mjs";
import { t as isDiagnosticFlagEnabled } from "./diagnostic-flags-CaSenm_x.mjs";
import { v as resolveSessionAgentIdsStrict } from "./agent-scope-bJOokm5r.mjs";
import { t as AgentHarnessPreflightError } from "./errors-BAipjK5G.mjs";
import "./string-coerce-runtime-BbIJhy7G.mjs";
import "./session-key-runtime-DcC4DAZ0.mjs";
import { n as formatStageTimings, t as createStageTimingTracker } from "./stage-timing-BUG4Fnsv.mjs";
import "./time-runtime-SlsIp1up.mjs";
import "./agent-scope-runtime-OJ73CMLc.mjs";
import { i as isActiveHarnessContextEngine } from "./context-engine-lifecycle-VZRsjQoh.mjs";
import { n as isHostScopedAgentToolActive } from "./agent-tools.ring-zero-context-DcmTQndF.mjs";
import { t as log } from "./logger-Wi08e7sJ.mjs";
import { t as buildCodexUserMcpServersThreadConfigPatchForRun } from "./bundle-mcp-codex-B9PVAbaM.mjs";
import "./codex-mcp-projection-D5mgJFub.mjs";
import "./agent-runtime-EaVkuTjC.mjs";
import "./agent-harness-runtime-BMDPbwfj.mjs";
import { i as isJsonObject, r as flattenCodexDynamicToolFunctions } from "./protocol-BFKfDKvv.mjs";
import { n as matchesPendingSupervisionBranch } from "./session-binding-record-codec-CRT1AaY2.mjs";
import { m as sessionBindingIdentity, n as assertCodexBindingMayBeReplaced } from "./session-binding-record-CwOT-LiL.mjs";
import { l as fingerprintCodexPolicy } from "./config-security-CTku09Ov.mjs";
import { f as resolveCodexPluginsPolicy } from "./config-parsing-B3YiOIOS.mjs";
import { n as resolveCodexAppServerLocalHomeDir, t as resolveCodexAppServerHomeDir } from "./auth-start-options-B2DNF9ld.mjs";
import { d as readCodexEffectiveConfig, s as assertCodexModelBackedReviewerEffectiveConfig, u as CODEX_SESSION_OVERRIDABLE_LAYER_TYPES } from "./config-options-CCf8k-Cm.mjs";
import { S as retainSharedCodexAppServerClientByInstanceId, d as getCurrentSharedClientEntry } from "./auth-cache-key-bTVCFzEj.mjs";
import { t as withCodexAppServerThreadMutation } from "./thread-ownership-queue-DEasJsr3.mjs";
import { o as isCodexAppServerOverloadError, r as CodexAppServerRpcError, s as isCodexThreadReadMissingError } from "./rpc-error-KGL29qfa.mjs";
import { t as codexCatalogHomeId } from "./session-catalog-home-id-CwZghGbc.mjs";
import { r as withAbortableTimeout } from "./timeout-Do68a1Pi.mjs";
import { t as projectBoundedCodexThreadHistory } from "./transcript-history-projection-BPVoig62.mjs";
import { a as defaultCodexAppInventoryCache, t as buildCodexAppServerConnectionFingerprint } from "./plugin-app-cache-key-CSuMSjeK.mjs";
import { n as readCodexSessionMeta } from "./session-catalog-provenance-Cqn6lEvB.mjs";
import { t as assertCodexSessionRuntimeOwnership } from "./binding-connection-DnWtdVHb.mjs";
import { c as resolveRecoverableCodexPluginConfigKeys } from "./plugin-inventory-BusaHZ3u.mjs";
import "./config-CjJLg5F4.mjs";
import { c as resolveCodexContextEngineProjectionMaxChars } from "./context-engine-projection-3uQzhqXD.mjs";
import { n as normalizeCodexAppServerBindingModelProvider } from "./auth-profile-1YI2InHK.mjs";
import { A as bindCodexInferenceThread, B as isCodexAppServerClientRuntimeLive, C as CodexThreadBindingConflictError, F as consumeCodexAppServerLiveThread, H as isCodexAppServerLiveThreadClaimed, M as getCodexInferenceThreadQualification, N as prepareCodexInferenceThreadConfig, S as CodexAdoptedThreadActiveError, T as CodexThreadStartRequestError, U as isCodexAppServerLiveThreadProtected, V as isCodexAppServerLiveThreadBackgroundOnly, X as unsubscribeCodexAppServerLiveThread, et as createCodexEphemeralThreadPolicy, j as getCodexInferenceThread, k as assertCodexInferenceRouteConfig, n as captureCodexAppServerClientLifetime, nt as wasCodexAppServerThreadClosed, q as releaseCodexAppServerLiveThread, tt as isCodexAppServerThreadTerminalNotification, w as CodexThreadClientReplacementError, z as hasCodexAppServerSiblingThreadWork } from "./shared-client-DdgevElW.mjs";
import { I as resolveCodexAppServerClientInstanceId, P as getCodexAppServerClientInstanceId, S as resolveCodexThreadRolloutPath, _ as assertExactSupervisionModelSelection, f as assertCodexThreadAcceptsDirectInput, h as assertCodexThreadStartResponse, p as assertCodexThreadForkResponse, s as isCodexAppServerRequestTimeoutError, x as readSupervisionResponseThreadId } from "./client-CkG-Hy_-.mjs";
import { r as hasCodexAppServerSiblingRouteWork } from "./turn-router-DKYVl_K8.mjs";
import { a as closeCodexStartupClientBestEffort, c as retireUnsafeCodexTurnClientBestEffort, d as unsubscribeCodexThreadBestEffort, n as CODEX_APP_SERVER_UNSUBSCRIBE_TIMEOUT_MS, r as CodexAppServerUnsafeSubscriptionError } from "./attempt-client-cleanup-DrkNSzyZ.mjs";
import { a as buildCodexPluginThreadConfigInputFingerprint, c as buildPluginAppPolicyContext, d as mergeCodexThreadConfigs, i as buildCodexPluginThreadConfig, l as disableUnlistedCodexApps, m as buildCodexAppApprovalOverrides, n as mergeCodexNativeProjectDocThreadConfig, o as buildCodexPluginThreadConfigTimeoutFallback, p as shouldBuildCodexPluginThreadConfig, r as buildCodexPluginAppsConfigPatchFromPolicyContext, u as isCodexPluginThreadBindingStale } from "./project-doc-thread-config-DI1pqJkd.mjs";
import { A as isTransientWebSearchRestriction, C as fingerprintEnvironmentSelection, D as readActiveCodexTurnIdsFromResume, E as legacyFingerprintUserMcpServersConfigPatch, I as isMessageOnlyCodexSourceReply, L as isSystemAgentOnlyCodexDynamicToolAllowlist, M as shouldRotateCodexAppServerBindingForRuntime, N as shouldRotateCodexGpt56MultiAgentBinding, O as shouldStartTransientNoToolThread, S as fingerprintCodexThreadConfig, T as fingerprintUserMcpServersConfigPatch, _ as buildDeveloperInstructions, b as codexDynamicToolsFingerprint, c as codexThreadSandboxOrPermissions, d as readCodexManagedRequirementsFingerprint, f as resolveCodexThreadApprovalsReviewer, g as mergeCodexNativeShellEnvironment, h as resolveCodexWebSearchPlan, i as buildCodexRuntimeThreadConfigForRun, j as shouldRecheckRecoverablePluginBinding, n as buildCodexRingZeroThreadConfigPatch, o as buildThreadResumeParams, p as attestCodexRestrictedToolSurfaceMcpServersDisabled, s as buildThreadStartParams, t as assertCodexManagedRequirementsDoNotOverrideToolPolicy, u as readCodexInheritedMcpServerNames, v as areCodexDynamicToolFingerprintsCompatible, w as fingerprintJsonObject, x as codexLegacyDynamicToolsFingerprint, y as areUserMcpServersFingerprintsCompatible } from "./thread-requests-D_61JaDg.mjs";
import { a as resolveCodexSessionBinding, s as hashCodexAppServerBindingFingerprint } from "./session-binding-C5pvLMJ2.mjs";
import { i as resolveCodexAppServerThreadModelSelection, n as resolveCodexAppServerModelProvider } from "./thread-model-selection-C-001bCj.mjs";
import { r as retainCodexAppServerBindingSubscription, s as withExclusiveCodexAppServerThread, t as isSameCodexAppServerThreadOwner } from "./thread-ownership-Bla98Ktc.mjs";
import { a as refreshCodexThreadInstructions, i as assertCodexSupervisionThreadLineage, n as CodexThreadPolicyHandoffError, o as refreshCodexThreadPolicy, r as assertAdoptedCodexThreadResumeAllowed, t as CodexIncognitoPolicyChangeError } from "./thread-policy-Bxsxakn-.mjs";
import { t as resumeCodexAppServerThread } from "./thread-resume-DhhrLiRj.mjs";
import { r as readCodexMcpToolConnectorId } from "./mcp-tool-metadata-BFGN_bx3.mjs";
import { n as disableCodexPluginThreadConfig } from "./dynamic-tool-build-DEsvks0u.mjs";
import { n as CodexManagedHooksOnlyError, r as assertCodexNativeHookRelayAllowed } from "./native-hook-relay-B5ftegWB.mjs";
import { t as defaultCodexPluginMetadataCache } from "./plugin-metadata-cache-Bi8TAPwX.mjs";
import { a as discardUnattestedCodexPluginThread, i as checkCodexThreadAppAvailability, n as resolveCodexNativeSkillIsolation, o as hasCodexNativeToolCatalog, r as attestCodexThreadToolSurface, s as loadCodexNativeToolCatalog, t as applyCodexNativeSkillIsolation } from "./native-skill-isolation-Bl0kFxI5.mjs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import crypto from "node:crypto";
//#region extensions/codex/src/app-server/scheduled-app-tool-policy.ts
function normalizeAppToolApprovalMode(value) {
	return value === "auto" || value === "prompt" || value === "writes" || value === "approve" ? value : void 0;
}
function readCurrentToolPolicy(config, appId, toolName, metadata, fallbackApprovalMode = "auto") {
	const apps = asOptionalRecord(config.apps);
	const app = asOptionalRecord(apps?.[appId]);
	const defaults = asOptionalRecord(apps?.["_default"]);
	const tools = asOptionalRecord(app?.tools);
	const tool = asOptionalRecord(tools?.[toolName] ?? (metadata?.title !== void 0 ? tools?.[metadata.title] : void 0));
	const toolApprovalMode = normalizeAppToolApprovalMode(tool?.approval_mode);
	let approvalMode = toolApprovalMode ?? normalizeAppToolApprovalMode(app?.default_tools_approval_mode) ?? normalizeAppToolApprovalMode(defaults?.default_tools_approval_mode) ?? fallbackApprovalMode;
	if (!toolApprovalMode) {
		const links = asOptionalRecord(app?.links);
		if (metadata?.requiresExplicitLinkId) for (const link of Object.values(links ?? {})) {
			const linkMode = normalizeAppToolApprovalMode(asOptionalRecord(link)?.default_tools_approval_mode);
			if (linkMode) approvalMode = intersectToolApprovalMode(approvalMode, linkMode);
		}
		else if (metadata?.linkId) approvalMode = normalizeAppToolApprovalMode(asOptionalRecord(links?.[metadata.linkId])?.default_tools_approval_mode) ?? approvalMode;
	}
	const defaultToolsEnabled = app?.default_tools_enabled;
	return {
		enabled: (app ? app.enabled !== false : defaults?.enabled !== false) && (typeof tool?.enabled === "boolean" ? tool.enabled : typeof defaultToolsEnabled === "boolean" ? defaultToolsEnabled : appToolHintsAllowed(metadata, {
			allowDestructiveActions: (app?.destructive_enabled ?? defaults?.destructive_enabled) !== false,
			allowOpenWorld: (app?.open_world_enabled ?? defaults?.open_world_enabled) !== false
		})),
		approvalMode
	};
}
function appToolHintsAllowed(tool, policy) {
	return (policy.allowDestructiveActions || tool?.destructiveHint === false) && (policy.allowOpenWorld !== false || tool?.openWorldHint === false);
}
function intersectToolApprovalMode(captured, current) {
	if (captured === current || current === "approve") return captured;
	if (captured === "approve") return current;
	return "prompt";
}
//#endregion
//#region extensions/codex/src/app-server/scheduled-app-authority.ts
const CODEX_SCHEDULED_APP_AUTHORITY_NAMESPACE = "codex.apps";
const CODEX_APPS_MCP_SERVER = "codex_apps";
const MCP_STATUS_PAGE_SIZE = 100;
const MCP_STATUS_MAX_PAGES = 100;
const CODEX_APP_AUTHORITY_CAPTURE_TIMEOUT_MS = 6e4;
const CODEX_APP_AUTHORITY_CAPTURE_MIN_TIMEOUT_MS = 100;
/** Hashes stable configured endpoint identity without retaining credentials or endpoint details. */
function buildScheduledCodexAppServerConnectionIdentity(appServer) {
	const start = appServer.start;
	return crypto.createHash("sha256").update("openclaw:codex:scheduled-app-server:v1\0").update(JSON.stringify({
		transport: start.transport,
		command: start.command,
		commandSource: start.commandSource ?? null,
		args: start.args,
		cwd: start.cwd ?? null,
		url: start.url ?? null,
		homeScope: start.homeScope ?? null,
		connectionClass: appServer.connectionClass,
		remoteWorkspaceRoot: appServer.remoteWorkspaceRoot ?? null
	})).digest("hex");
}
function resolveScheduledCodexAppCreatorCaptureDecision(params) {
	if (!params.appsMayBeVisible) return {
		required: false,
		supported: false
	};
	const unavailableReason = params.authenticatedScheduledMode ? "A scheduled Codex continuation cannot create new app-authorized automations. Recreate it from a fresh authenticated owner turn; no automation changes were saved." : params.usesSupervisionConnection ? "Codex apps are visible through a supervised connection that cannot capture creator authority. Use an isolated prepared-profile Codex creator turn; no automation changes were saved." : params.homeScope === "user" ? "Codex apps are visible through a user-home runtime that cannot capture isolated creator authority. Use an agent-scoped prepared-profile Codex creator turn; no automation changes were saved." : !params.hasPreparedAccountIdentity && !params.hasConfiguredAppServerIdentity ? "Codex app authority requires either a prepared ChatGPT profile or an isolated configured app-server identity. Reauthenticate the selected Codex profile or configured app-server, then retry; no automation changes were saved." : void 0;
	return {
		required: true,
		supported: !unavailableReason,
		...unavailableReason ? { unavailableReason } : {}
	};
}
function normalizeApprovalMode(value) {
	return value === "allow" || value === "deny" || value === "auto" || value === "ask" ? value : void 0;
}
function defaultApprovalMode(entry) {
	return entry.destructiveApprovalMode ?? (entry.allowDestructiveActions ? "allow" : "deny");
}
function parseScheduledCodexAppAuthority(authority) {
	if (!authority || authority.runtimeId !== "codex") return;
	if (authority.version !== 1) throw new Error("Unsupported Codex scheduled authority version; reauthorize this automation.");
	if (authority.namespace !== CODEX_SCHEDULED_APP_AUTHORITY_NAMESPACE) throw new Error(`Unsupported Codex scheduled authority namespace ${authority.namespace}; reauthorize this automation.`);
	const payload = asOptionalRecord(authority.payload);
	const auth = asOptionalRecord(payload?.auth);
	const profileId = normalizeOptionalString(auth?.profileId);
	const connectionFingerprint = normalizeOptionalString(auth?.connectionFingerprint);
	const managedRequirementsFingerprint = normalizeOptionalString(auth?.managedRequirementsFingerprint);
	const accountId = normalizeOptionalString(auth?.accountId);
	const parsedAuth = auth?.kind === "configured-app-server" && connectionFingerprint && managedRequirementsFingerprint ? {
		kind: "configured-app-server",
		connectionFingerprint,
		managedRequirementsFingerprint
	} : auth?.kind === void 0 && profileId && accountId ? {
		profileId,
		accountId
	} : void 0;
	if (payload?.version !== 1 || !parsedAuth || !Array.isArray(payload.apps)) throw new Error("Stored Codex app authority is invalid; reauthorize this automation.");
	const seen = /* @__PURE__ */ new Set();
	return {
		version: 1,
		auth: parsedAuth,
		apps: payload.apps.map((raw) => {
			const app = asOptionalRecord(raw);
			const id = normalizeOptionalString(app?.id);
			const destructiveApprovalMode = normalizeApprovalMode(app?.destructiveApprovalMode);
			const rawTools = asOptionalRecord(app?.tools);
			if (!id || seen.has(id) || typeof app?.allowDestructiveActions !== "boolean" || typeof app.allowOpenWorld !== "boolean" || !destructiveApprovalMode || !rawTools) throw new Error("Stored Codex app authority is invalid; reauthorize this automation.");
			seen.add(id);
			const tools = {};
			for (const [name, rawMode] of Object.entries(rawTools)) {
				const toolName = normalizeOptionalString(name);
				const mode = normalizeAppToolApprovalMode(rawMode);
				if (!toolName || !mode) throw new Error("Stored Codex app authority is invalid; reauthorize this automation.");
				tools[toolName] = mode;
			}
			return {
				id,
				allowDestructiveActions: app.allowDestructiveActions,
				allowOpenWorld: app.allowOpenWorld,
				destructiveApprovalMode,
				tools
			};
		})
	};
}
async function readCodexScheduledAppToolsByApp(params) {
	const toolsByApp = /* @__PURE__ */ new Map();
	const seenCursors = /* @__PURE__ */ new Set();
	let cursor;
	for (let page = 0; page < MCP_STATUS_MAX_PAGES; page += 1) {
		const response = await params.request("mcpServerStatus/list", {
			...params.threadId ? { threadId: params.threadId } : {},
			detail: "toolsAndAuthOnly",
			limit: MCP_STATUS_PAGE_SIZE,
			...cursor ? { cursor } : {}
		});
		if (!isJsonObject(response) || !Array.isArray(response.data)) throw new Error("Codex mcpServerStatus/list returned invalid scheduled app inventory");
		for (const status of response.data) {
			if (!isJsonObject(status) || !isJsonObject(status.tools)) throw new Error("Codex scheduled app inventory contained an invalid server status");
			if (status.name !== CODEX_APPS_MCP_SERVER) continue;
			for (const [toolName, tool] of Object.entries(status.tools)) {
				const connectorId = readCodexMcpToolConnectorId(tool);
				if (connectorId) {
					const tools = toolsByApp.get(connectorId) ?? /* @__PURE__ */ new Map();
					const metadata = asOptionalRecord(tool);
					const appMetadata = asOptionalRecord(metadata?._meta);
					const annotations = asOptionalRecord(metadata?.annotations);
					tools.set(toolName, {
						title: typeof metadata?.title === "string" ? metadata.title : void 0,
						linkId: typeof appMetadata?.link_id === "string" && appMetadata.link_id.trim() ? appMetadata.link_id : void 0,
						requiresExplicitLinkId: asOptionalRecord(appMetadata?.["_codex_apps"])?.requires_explicit_link_id === true,
						destructiveHint: annotations?.destructiveHint === false ? false : void 0,
						openWorldHint: annotations?.openWorldHint === false ? false : void 0
					});
					toolsByApp.set(connectorId, tools);
				}
			}
		}
		if (response.nextCursor !== void 0 && response.nextCursor !== null && typeof response.nextCursor !== "string") throw new Error("Codex scheduled app inventory returned an invalid pagination cursor");
		cursor = response.nextCursor;
		if (!cursor) return toolsByApp;
		if (seenCursors.has(cursor)) throw new Error("Codex app connector inventory repeated its pagination cursor");
		seenCursors.add(cursor);
	}
	throw new Error("Codex app connector inventory exceeded its bounded page limit");
}
/** Reads current account policy and connector-backed tool metadata under one caller deadline. */
async function readCurrentCodexScheduledAppPolicy(params) {
	const [configResponse, toolsByApp] = await Promise.all([params.request("config/read", {
		includeLayers: false,
		...params.configCwd ? { cwd: params.configCwd } : {}
	}), readCodexScheduledAppToolsByApp(params)]);
	if (!isJsonObject(configResponse)) throw new Error("Codex config/read returned an invalid scheduled app policy response");
	return {
		config: isJsonObject(configResponse.config) ? configResponse.config : {},
		toolsByApp
	};
}
/** Captures only apps callable on the exact active Codex client/thread. */
async function captureScheduledCodexAppAuthority(params) {
	const requestedTimeoutMs = params.timeoutMs ?? CODEX_APP_AUTHORITY_CAPTURE_TIMEOUT_MS;
	const timeoutMs = Math.min(CODEX_APP_AUTHORITY_CAPTURE_TIMEOUT_MS, Math.max(CODEX_APP_AUTHORITY_CAPTURE_MIN_TIMEOUT_MS, Number.isFinite(requestedTimeoutMs) ? Math.floor(requestedTimeoutMs) : CODEX_APP_AUTHORITY_CAPTURE_TIMEOUT_MS));
	const deadlineMs = performance.now() + timeoutMs;
	const boundedClient = { request: ((method, requestParams) => {
		const remainingTimeoutMs = deadlineMs - performance.now();
		if (remainingTimeoutMs <= 0) throw new CodexScheduledAppAuthorityCaptureTimeoutError();
		return params.client.request(method, requestParams, {
			timeoutMs: remainingTimeoutMs,
			signal: params.signal
		});
	}) };
	let installed;
	let currentPolicy;
	let auth;
	const creatorAuth = params.auth;
	const inventoryDiagnostics = {
		serverNames: /* @__PURE__ */ new Set(),
		codexAppsStatusCount: 0,
		codexAppsToolNames: /* @__PURE__ */ new Set(),
		connectorIds: /* @__PURE__ */ new Set(),
		connectorlessToolCount: 0
	};
	const requestWithInventoryDiagnostics = async (method, requestParams) => {
		const response = await boundedClient.request(method, requestParams);
		if (method === "mcpServerStatus/list" && isJsonObject(response) && Array.isArray(response.data)) for (const status of response.data) {
			if (!isJsonObject(status) || typeof status.name !== "string") continue;
			inventoryDiagnostics.serverNames.add(status.name);
			if (status.name !== CODEX_APPS_MCP_SERVER || !isJsonObject(status.tools)) continue;
			inventoryDiagnostics.codexAppsStatusCount += 1;
			for (const [toolName, tool] of Object.entries(status.tools)) {
				inventoryDiagnostics.codexAppsToolNames.add(toolName);
				const connectorId = readCodexMcpToolConnectorId(tool);
				if (connectorId) inventoryDiagnostics.connectorIds.add(connectorId);
				else inventoryDiagnostics.connectorlessToolCount += 1;
			}
		}
		return response;
	};
	try {
		[installed, currentPolicy, auth] = await withAbortableTimeout({
			promise: Promise.all([
				boundedClient.request("app/installed", {
					threadId: params.threadId,
					forceRefresh: false
				}),
				readCurrentCodexScheduledAppPolicy({
					request: requestWithInventoryDiagnostics,
					threadId: params.threadId,
					configCwd: params.configCwd
				}),
				creatorAuth.kind === "prepared-profile" ? Promise.resolve({
					profileId: creatorAuth.profileId,
					accountId: creatorAuth.accountId
				}) : readCodexManagedRequirementsFingerprint(boundedClient, params.signal).then((managedRequirementsFingerprint) => ({
					kind: creatorAuth.kind,
					connectionFingerprint: creatorAuth.connectionFingerprint,
					managedRequirementsFingerprint
				}))
			]),
			timeoutMs,
			signal: params.signal,
			timeoutMessage: "Codex scheduled app authority capture deadline elapsed",
			createTimeoutError: () => new CodexScheduledAppAuthorityCaptureTimeoutError()
		});
	} catch (error) {
		if (params.signal?.aborted || !(error instanceof CodexScheduledAppAuthorityCaptureTimeoutError) && !isCodexAppServerRequestTimeoutError(error)) throw error;
		throw new Error(`Codex app authority capture exceeded its ${timeoutMs} ms total budget. No automation changes were saved; retry after Codex app inventory is responsive.`, { cause: error });
	}
	const callableIds = new Set(installed.apps.filter((app) => app.enabled && app.callable).map((app) => app.id));
	const apps = Object.entries(params.policyContext.apps).filter(([id]) => callableIds.has(id) && currentPolicy.toolsByApp.has(id)).map(([id, policy]) => ({
		id,
		allowDestructiveActions: policy.allowDestructiveActions,
		allowOpenWorld: policy.allowOpenWorld !== false,
		destructiveApprovalMode: defaultApprovalMode(policy),
		tools: Object.fromEntries([...currentPolicy.toolsByApp.get(id)?.keys() ?? []].toSorted().map((toolName) => [toolName, readCurrentToolPolicy(currentPolicy.config, id, toolName, currentPolicy.toolsByApp.get(id)?.get(toolName), appApprovalCeiling(defaultApprovalMode(policy))).approvalMode]))
	})).toSorted((left, right) => left.id.localeCompare(right.id));
	if (apps.length === 0) throw new Error(`Codex app authority inventory was empty; no automation changes were saved. Diagnostics: ${JSON.stringify({
		installedApps: installed.apps.map((app) => ({ id: app.id, enabled: app.enabled, callable: app.callable })),
		policyAppIds: Object.keys(params.policyContext.apps).toSorted(),
		toolAppIds: [...currentPolicy.toolsByApp.entries()].map(([id, tools]) => ({ id, count: tools.size })).toSorted((left, right) => left.id.localeCompare(right.id)),
		mcpServerNames: [...inventoryDiagnostics.serverNames].toSorted(),
		codexAppsStatusCount: inventoryDiagnostics.codexAppsStatusCount,
		codexAppsToolNames: [...inventoryDiagnostics.codexAppsToolNames].toSorted().slice(0, 50),
		connectorIds: [...inventoryDiagnostics.connectorIds].toSorted(),
		connectorlessToolCount: inventoryDiagnostics.connectorlessToolCount
	})}`);
	return {
		version: 1,
		runtimeId: "codex",
		namespace: CODEX_SCHEDULED_APP_AUTHORITY_NAMESPACE,
		payload: {
			version: 1,
			auth,
			apps
		}
	};
}
var CodexScheduledAppAuthorityCaptureTimeoutError = class extends Error {
	constructor() {
		super("Codex scheduled app authority capture deadline elapsed");
		this.name = "CodexScheduledAppAuthorityCaptureTimeoutError";
	}
};
const APPROVAL_RANK = {
	deny: 0,
	ask: 1,
	auto: 2,
	allow: 3
};
function stricterApprovalMode(left, right) {
	return APPROVAL_RANK[left] <= APPROVAL_RANK[right] ? left : right;
}
function appApprovalCeiling(mode) {
	if (mode === "allow") return "approve";
	return mode === "ask" ? "prompt" : "auto";
}
/** Intersects a stored app-ID cap with current policy without admitting new apps. */
function intersectCodexPluginThreadConfigWithScheduledAuthority(config, authority, currentPolicy = {
	config: {},
	toolsByApp: /* @__PURE__ */ new Map()
}, toolsAllow) {
	const scheduled = parseScheduledCodexAppAuthority(authority);
	if (!scheduled) return config;
	const omittedAppIds = scheduled.apps.map((app) => app.id).filter((id) => {
		const currentTools = currentPolicy.toolsByApp.get(id);
		return !Object.hasOwn(config.policyContext.apps, id) || !currentTools || currentTools.size === 0;
	}).toSorted();
	if (omittedAppIds.length > 0) {
		const visibleIds = omittedAppIds.slice(0, 10).join(", ");
		const remaining = omittedAppIds.length - Math.min(omittedAppIds.length, 10);
		throw new AgentHarnessPreflightError(`Scheduled Codex apps are unavailable under the current policy or account: ${visibleIds}${remaining > 0 ? ` (and ${remaining} more)` : ""}. Restore access or reauthorize the automation from a fresh authenticated Codex owner turn.`);
	}
	const capturedById = new Map(scheduled.apps.map((app) => [app.id, app]));
	const apps = {};
	for (const [id, current] of Object.entries(config.policyContext.apps)) {
		const captured = capturedById.get(id);
		if (!captured) continue;
		apps[id] = {
			...current,
			allowDestructiveActions: current.allowDestructiveActions && captured.allowDestructiveActions,
			allowOpenWorld: current.allowOpenWorld !== false && captured.allowOpenWorld,
			destructiveApprovalMode: stricterApprovalMode(defaultApprovalMode(current), captured.destructiveApprovalMode)
		};
	}
	const pluginAppIds = Object.fromEntries(Object.entries(config.policyContext.pluginAppIds).map(([key, ids]) => [key, ids.filter((id) => Object.hasOwn(apps, id))]).filter(([, ids]) => ids.length > 0));
	const policyContext = buildPluginAppPolicyContext(apps, pluginAppIds);
	const configPatch = disableUnlistedCodexApps(buildCodexPluginAppsConfigPatchFromPolicyContext(policyContext), currentPolicy.config);
	const appsPatch = asOptionalRecord(configPatch.apps);
	for (const [appId, captured] of capturedById) {
		const appPatch = asOptionalRecord(appsPatch?.[appId]);
		const currentApp = Object.hasOwn(apps, appId) ? apps[appId] : void 0;
		if (!appPatch || !currentApp) continue;
		if (currentApp.destructiveApprovalMode === "ask") Object.assign(appPatch, buildCodexAppApprovalOverrides(currentPolicy.config, {
			id: appId,
			approvalOverrideToolConfigKeys: []
		}));
		const storedAppCeiling = appApprovalCeiling(captured.destructiveApprovalMode);
		const currentAppCeiling = appApprovalCeiling(defaultApprovalMode(currentApp));
		const tools = currentPolicy.toolsByApp.get(appId) ?? /* @__PURE__ */ new Map();
		const jobToolAllow = toolsAllow === void 0 ? void 0 : new Set(toolsAllow);
		appPatch.tools = Object.fromEntries([...tools.keys()].toSorted().map((toolName) => {
			const capturedMode = captured.tools[toolName] ?? storedAppCeiling;
			const currentToolPolicy = readCurrentToolPolicy(currentPolicy.config, appId, toolName, tools.get(toolName), currentAppCeiling);
			return [toolName, {
				enabled: currentToolPolicy.enabled && appToolHintsAllowed(tools.get(toolName), currentApp) && (!jobToolAllow || jobToolAllow.has("*") || jobToolAllow.has(toolName) || jobToolAllow.has(`codex_apps.${toolName}`)),
				approval_mode: intersectToolApprovalMode(intersectToolApprovalMode(capturedMode, storedAppCeiling), intersectToolApprovalMode(currentToolPolicy.approvalMode, currentAppCeiling))
			}];
		}));
	}
	return {
		...config,
		fingerprint: fingerprintCodexPolicy({
			version: 1,
			namespace: CODEX_SCHEDULED_APP_AUTHORITY_NAMESPACE,
			authority: scheduled,
			inputFingerprint: config.inputFingerprint,
			policyContext,
			configPatch
		}),
		configPatch,
		provisionalAppIds: Object.keys(apps).toSorted(),
		policyContext
	};
}
function readScheduledCodexAppManagedRequirementsFingerprint(authority) {
	const auth = parseScheduledCodexAppAuthority(authority)?.auth;
	return auth?.kind === "configured-app-server" ? auth.managedRequirementsFingerprint : void 0;
}
function assertScheduledCodexAppAuthorityRuntime(connection, params) {
	const scheduledAuth = parseScheduledCodexAppAuthority(params.scheduledRuntimeAuthority)?.auth;
	if (!scheduledAuth) return;
	if (params.trigger !== "cron" || connection.usesSupervisionConnection || connection.appServer.start.homeScope === "user") throw new AgentHarnessPreflightError("This automation's Codex app authority requires an isolated scheduled runtime. Reauthorize it from a supported Codex creator turn.");
	if (scheduledAuth.kind === "configured-app-server") {
		if (buildScheduledCodexAppServerConnectionIdentity(connection.appServer) !== scheduledAuth.connectionFingerprint) throw new AgentHarnessPreflightError("This automation was authorized for a different configured Codex app-server. Restore that connection or reauthorize the automation from a fresh owner turn.");
		return;
	}
	const prepared = connection.startupPreparedAuth;
	if (prepared?.kind !== "profile" || prepared.profileId !== scheduledAuth.profileId || prepared.snapshot?.loginParams.type !== "chatgptAuthTokens" || prepared.snapshot.chatgptAccountId !== scheduledAuth.accountId) throw new AgentHarnessPreflightError(`This automation was authorized for Codex profile ${scheduledAuth.profileId}, but that exact prepared account is not active. Restore the profile or reauthorize the automation from a fresh owner turn.`);
}
function buildLegacyScheduledCodexAppRecoveryPrompt(params) {
	if (params.trigger !== "cron" || !params.scheduledRuntimeAuthorityRecoveryRequired || params.scheduledRuntimeAuthority) return;
	return "Scheduled Codex app access is unavailable because this automation predates runtime-specific app authority capture. Tell the operator to recreate or reauthorize it from a fresh authenticated Codex owner turn; do not claim an app action succeeded.";
}
/** Makes stored-cap identity part of thread reuse admission, including cap removal. */
function buildScheduledCodexAppAuthorityInputFingerprint(baseFingerprint, authority, toolsAllow) {
	const scheduled = parseScheduledCodexAppAuthority(authority);
	if (!scheduled) return baseFingerprint;
	return fingerprintCodexPolicy({
		version: 1,
		namespace: CODEX_SCHEDULED_APP_AUTHORITY_NAMESPACE,
		baseFingerprint,
		authority: scheduled,
		toolsAllow: toolsAllow === void 0 ? null : [...toolsAllow].toSorted()
	});
}
//#endregion
//#region extensions/codex/src/app-server/plugin-thread-config-deadline.ts
/** Enforces one bounded startup budget across Codex plugin config discovery. */
const CODEX_PLUGIN_THREAD_CONFIG_MAX_TIMEOUT_MS = 6e4;
const CODEX_PLUGIN_THREAD_CONFIG_TIMEOUT_DIVISOR = 4;
const CODEX_PLUGIN_THREAD_CONFIG_MIN_TIMEOUT_MS = 100;
var CodexPluginThreadConfigDeadlineError = class extends Error {
	constructor() {
		super("Codex plugin thread config deadline elapsed");
		this.name = "CodexPluginThreadConfigDeadlineError";
	}
};
/** Resolves the plugin policy state reused throughout app-server startup. */
function resolveCodexPluginThreadConfigStartupPolicy(params) {
	const pluginThreadConfigRequired = params.hostedAppsSupported === false || Boolean(params.scheduledRuntimeAuthority) || !params.nativeToolSurfaceEnabled || shouldBuildCodexPluginThreadConfig(params.pluginConfig);
	const pluginThreadConfigPluginConfig = params.hostedAppsSupported !== false && (params.nativeToolSurfaceEnabled || params.scheduledRuntimeAuthority) ? params.pluginConfig : disableCodexPluginThreadConfig(params.pluginConfig);
	const resolvedPluginPolicy = pluginThreadConfigRequired ? resolveCodexPluginsPolicy(pluginThreadConfigPluginConfig) : void 0;
	return {
		pluginThreadConfigRequired,
		pluginThreadConfigPluginConfig,
		resolvedPluginPolicy,
		enabledPluginConfigKeys: resolvedPluginPolicy ? resolvedPluginPolicy.pluginPolicies.filter((plugin) => plugin.enabled).map((plugin) => plugin.configKey).toSorted() : void 0
	};
}
/** Builds plugin config without allowing sequential RPC timeouts to consume the turn. */
async function buildCodexPluginThreadConfigWithinDeadline(params) {
	const { requestTimeoutMs, signal, request, failClosedOnTimeout, transform, ...buildParams } = params;
	signal.throwIfAborted();
	const timeoutMs = resolveCodexPluginThreadConfigTimeoutMs(requestTimeoutMs);
	const deadlineMs = performance.now() + timeoutMs;
	let requestTimedOut = false;
	const boundedRequest = async (method, requestParams) => {
		const remainingTimeoutMs = deadlineMs - performance.now();
		if (requestTimedOut || remainingTimeoutMs <= 0) throw new CodexPluginThreadConfigDeadlineError();
		try {
			return await request(method, requestParams, {
				timeoutMs: remainingTimeoutMs,
				signal
			});
		} catch (error) {
			requestTimedOut ||= isCodexPluginThreadConfigTimeoutError(error);
			throw error;
		}
	};
	try {
		return await withAbortableTimeout({
			signal,
			timeoutMs,
			promise: (async () => {
				const config = await buildCodexPluginThreadConfig({
					...buildParams,
					request: boundedRequest
				});
				const result = transform ? await transform(config, boundedRequest) : config;
				if (requestTimedOut || performance.now() >= deadlineMs) throw new CodexPluginThreadConfigDeadlineError();
				return result;
			})(),
			timeoutMessage: "Codex plugin thread config deadline elapsed",
			createTimeoutError: () => new CodexPluginThreadConfigDeadlineError()
		});
	} catch (error) {
		if (signal.aborted || !requestTimedOut && !isCodexPluginThreadConfigTimeoutError(error) && performance.now() < deadlineMs) throw error;
		if (failClosedOnTimeout) throw new AgentHarnessPreflightError(`Codex app policy verification exceeded its ${timeoutMs} ms startup budget. No app tools were executed. Retry after Codex app inventory is responsive.`);
		return buildCodexPluginThreadConfigTimeoutFallback({
			pluginConfig: buildParams.pluginConfig,
			appCacheKey: buildParams.appCacheKey,
			message: `Codex plugin discovery exceeded its ${timeoutMs} ms startup budget; plugin apps were disabled for this turn.`
		});
	}
}
/** Captures fingerprint inputs before startup work and binds the provider at admission. */
function prepareCodexPluginThreadConfigStartupProvider(prepared) {
	const { startupPolicy, appCacheKey } = prepared;
	if (!startupPolicy.pluginThreadConfigRequired) return;
	const { pluginThreadConfigPluginConfig: pluginConfig, resolvedPluginPolicy: policy, enabledPluginConfigKeys } = startupPolicy;
	const inputFingerprint = buildScheduledCodexAppAuthorityInputFingerprint(buildCodexPluginThreadConfigInputFingerprint({
		pluginConfig,
		appCacheKey
	}), prepared.scheduledRuntimeAuthority, prepared.toolsAllow);
	return (params) => {
		const { client, appCache, metadataCache: configuredMetadataCache, ...buildParams } = params;
		const metadataCache = configuredMetadataCache ?? defaultCodexPluginMetadataCache;
		return {
			enabled: true,
			requiresCurrentPolicyCheck: Boolean(policy?.enabled || params.scheduledRuntimeAuthority),
			inputFingerprint,
			enabledPluginConfigKeys,
			accountAppRecoveryEnabled: policy?.allowAllPlugins,
			recoverablePluginConfigKeys: policy ? resolveRecoverableCodexPluginConfigKeys({
				policy,
				metadataCache,
				appCacheKey,
				configCwd: params.configCwd
			}) : void 0,
			build: async (buildOptions) => {
				const config = await buildCodexPluginThreadConfigWithinDeadline({
					...buildParams,
					pluginConfig,
					appCacheKey,
					threadId: buildOptions?.threadId,
					appCache: appCache ?? defaultCodexAppInventoryCache,
					metadataCache,
					failClosedOnTimeout: Boolean(params.scheduledRuntimeAuthority),
					transform: params.scheduledRuntimeAuthority ? async (builtConfig, request) => intersectCodexPluginThreadConfigWithScheduledAuthority(builtConfig, params.scheduledRuntimeAuthority, await readCurrentCodexScheduledAppPolicy({
						request,
						configCwd: params.configCwd,
						threadId: buildOptions?.threadId
					}), prepared.toolsAllow) : void 0,
					request: (method, requestParams, options) => client.request(method, requestParams, options)
				});
				return params.scheduledRuntimeAuthority && inputFingerprint ? {
					...config,
					inputFingerprint
				} : config;
			}
		};
	};
}
function resolveCodexPluginThreadConfigTimeoutMs(requestTimeoutMs) {
	return Math.min(CODEX_PLUGIN_THREAD_CONFIG_MAX_TIMEOUT_MS, Math.max(CODEX_PLUGIN_THREAD_CONFIG_MIN_TIMEOUT_MS, Math.floor((Number.isFinite(requestTimeoutMs) && requestTimeoutMs > 0 ? requestTimeoutMs : CODEX_PLUGIN_THREAD_CONFIG_MAX_TIMEOUT_MS * CODEX_PLUGIN_THREAD_CONFIG_TIMEOUT_DIVISOR) / CODEX_PLUGIN_THREAD_CONFIG_TIMEOUT_DIVISOR)));
}
function isCodexPluginThreadConfigTimeoutError(error) {
	return error instanceof CodexPluginThreadConfigDeadlineError || error instanceof Error && "code" in error && error.code === "CODEX_APP_SERVER_LOCAL_REQUEST_CANCELLED" && error.message.endsWith(" timed out");
}
//#endregion
//#region extensions/codex/src/app-server/thread-context-engine.ts
function buildContextEngineBinding(params, projection) {
	const contextEngine = isActiveHarnessContextEngine(params.contextEngine) ? params.contextEngine : void 0;
	const engineId = contextEngine?.info?.id?.trim();
	if (!contextEngine || !engineId) return;
	return {
		schemaVersion: 1,
		engineId,
		policyFingerprint: JSON.stringify({
			schemaVersion: 1,
			engineId,
			engineVersion: contextEngine.info.version,
			ownsCompaction: contextEngine.info.ownsCompaction === true,
			turnMaintenanceMode: contextEngine.info.turnMaintenanceMode,
			citationsMode: params.config?.memory?.citations,
			contextTokenBudget: params.contextTokenBudget,
			projectionMaxChars: resolveCodexContextEngineProjectionMaxChars({ contextTokenBudget: params.contextTokenBudget })
		}),
		projection: projection ? {
			schemaVersion: 1,
			mode: "thread_bootstrap",
			epoch: projection.epoch,
			fingerprint: projection.fingerprint
		} : void 0
	};
}
function isContextEngineBindingCompatible(previous, next) {
	const previousProjection = previous?.projection;
	const nextProjection = next.projection;
	return previous?.schemaVersion === next.schemaVersion && previous.engineId === next.engineId && previous.policyFingerprint === next.policyFingerprint && (!nextProjection ? previousProjection === void 0 : previousProjection?.schemaVersion === nextProjection.schemaVersion && previousProjection.mode === nextProjection.mode && previousProjection.epoch === nextProjection.epoch && previousProjection.fingerprint === nextProjection.fingerprint);
}
//#endregion
//#region extensions/codex/src/app-server/native-model-input-tools.ts
/** Stock native hooks flatten the configured V2 namespace without a delimiter. */
function resolveCodexNativeModelInputTools(config) {
	const features = isJsonObject(config.features) ? config.features : void 0;
	const multiAgent = isJsonObject(features?.multi_agent_v2) ? features.multi_agent_v2 : void 0;
	const namespace = typeof multiAgent?.tool_namespace === "string" ? multiAgent.tool_namespace.trim() : "collaboration";
	return [
		"spawn_agent",
		"multi_agent_v1send_input",
		"send_message",
		"followup_task",
		...namespace ? [
			`${namespace}spawn_agent`,
			`${namespace}send_message`,
			`${namespace}followup_task`
		] : []
	];
}
//#endregion
//#region extensions/codex/src/app-server/profiler-flag.ts
const PROFILER_FLAGS = ["profiler", "codex.profiler"];
function isCodexAppServerProfilerEnabled(config, env = process.env) {
	return PROFILER_FLAGS.some((flag) => isDiagnosticFlagEnabled(flag, config, env));
}
//#endregion
//#region extensions/codex/src/app-server/thread-lifecycle-timing.ts
function createCodexThreadLifecycleTimingTracker(options = {}) {
	const log$1 = options.log ?? log;
	const timing = createStageTimingTracker(options.now ?? Date.now);
	let didLog = false;
	return {
		measure: timing.measure,
		measureSync: timing.measureSync,
		mark(name) {
			timing.measureSync(name, () => void 0);
		},
		logSummary(params) {
			if (didLog) return;
			const { totalMs, stages: spans } = timing.snapshot();
			const detailed = options.enabled || log$1.isEnabled?.("trace");
			const totalThresholdMs = detailed ? 1e3 : 1e4;
			const stageThresholdMs = detailed ? 500 : 5e3;
			const shouldWarn = totalMs >= totalThresholdMs || spans.some((span) => span.durationMs >= stageThresholdMs);
			if (!shouldWarn && !log$1.isEnabled?.("trace")) return;
			didLog = true;
			const message = `[trace:codex-app-server] thread lifecycle: runId=${params.runId} sessionId=${params.sessionId} sessionKey=${params.sessionKey ?? "unknown"} action=${params.action} totalMs=${totalMs} stages=${formatStageTimings(spans)}`;
			const meta = {
				runId: params.runId,
				sessionId: params.sessionId,
				sessionKey: params.sessionKey,
				action: params.action,
				threadId: params.threadId,
				totalMs,
				spans
			};
			if (shouldWarn) log$1.warn(message, meta);
			else log$1.trace(message, meta);
		}
	};
}
//#endregion
//#region extensions/codex/src/app-server/thread-lifecycle-preflight.ts
function assertCodexThreadInferenceAuthority(params, modelPolicyEnforced) {
	if (params.inferenceRoute && modelPolicyEnforced) return;
	const host = params.params.hostCapabilities;
	const unavailable = () => new AgentHarnessPreflightError("This Codex connection cannot enforce your operator role's model policy. Use an OpenClaw-managed connection with an owned inference route; no turn was sent.");
	if (!host.retainSourceAuthority) throw unavailable();
	const source = host.retainSourceAuthority();
	if (source === void 0) return;
	try {
		source.assertCurrent();
		if (source.modelPolicyRequired !== false) throw unavailable();
	} finally {
		source.release();
	}
}
/** Preserve the selected provider when only its physical thread must be replaced. */
async function prepareCodexThreadRequestContext(params, options) {
	const startModelSelection = resolveCodexAppServerThreadModelSelection({
		homeScope: params.appServer.start.homeScope,
		provider: params.params.provider,
		model: params.runtimeModelId ?? params.params.modelId,
		binding: options.selectionBinding,
		authProfileId: params.params.authProfileId,
		authProfileStore: params.params.authProfileStore,
		agentDir: params.params.agentDir,
		config: params.params.config
	});
	const startModelProvider = startModelSelection.modelProvider;
	const source = params.params.hostCapabilities.retainSourceAuthority?.();
	const modelPolicyEnforced = params.nativeModelAdmission === void 0 || options.preflight.nativeModelInputTools !== void 0;
	let inference;
	try {
		source?.assertCurrent();
		inference = await prepareCodexInferenceThreadConfig({
			...params,
			config: options.config,
			binding: options.binding,
			clientId: options.clientId,
			operatorBacked: source !== void 0,
			modelPolicyEnforced,
			modelProvider: options.binding?.preserveNativeModel || options.binding?.connectionScope === "supervision" ? options.binding.modelProvider : startModelSelection.modelProvider,
			effectiveConfig: options.preflight.effectiveConfig,
			assertCurrent: () => {
				options.assertCurrent();
				source?.assertCurrent();
			}
		});
	} finally {
		source?.release();
	}
	params.config = inference?.config ?? options.config;
	params.inferenceRoute = inference?.route;
	params.inferenceProviderRoutes = inference?.providers;
	params.assertCurrent = () => {
		options.throwIfAborted();
		options.assertCurrent();
		assertCodexThreadInferenceAuthority(params, modelPolicyEnforced);
	};
	params.assertCurrent();
	return {
		...options.preflight,
		bindingIdentity: options.bindingIdentity,
		startModelSelection,
		startModelProvider,
		normalizeBindingModelProvider: (authProfileId, modelProvider) => normalizeCodexAppServerBindingModelProvider({
			authProfileId,
			modelProvider,
			authProfileStore: params.params.authProfileStore,
			agentDir: params.params.agentDir,
			config: params.params.config
		}),
		assertInferenceConfig: (config, modelProvider) => assertCodexInferenceRouteConfig(params.client, params.inferenceRoute, config, modelProvider, params.inferenceProviderRoutes),
		buildResumeParams: (binding, authProfileId, config) => buildThreadResumeParams(params.params, {
			...params,
			threadId: binding.threadId,
			authProfileId,
			model: startModelSelection.model,
			modelProvider: startModelProvider,
			preserveNativeModel: binding.preserveNativeModel === true,
			config,
			hostSystemAgentActive: options.preflight.hostSystemAgentActive,
			restrictedToolSurfaceInheritedMcpServerNames: options.preflight.restrictedToolSurfaceInheritedMcpServerNames
		}),
		throwIfAborted: options.throwIfAborted
	};
}
async function publishCodexThreadInferenceBinding(params, binding, reusedConfiguration = false) {
	const publish = () => {
		params.assertCurrent?.();
		params.signal?.throwIfAborted();
		assertCodexInferenceRouteConfig(params.client, params.inferenceRoute, params.config, binding.modelProvider, params.inferenceProviderRoutes);
		if (reusedConfiguration) {
			if (getCodexInferenceThread(params.client, binding.threadId) !== params.inferenceRoute) throw new Error("Codex inference thread configuration changed before reuse");
		} else bindCodexInferenceThread(params.client, binding.threadId, params.inferenceRoute, params.inferenceProviderRoutes);
		return binding;
	};
	return params.authority ? await params.authority.withCurrent(publish) : publish();
}
function resolveCodexThreadAgentDir(params) {
	const agentId = resolveSessionAgentIdsStrict({
		config: params.params.config,
		sessionKey: params.params.sessionKey,
		agentId: params.agentId ?? params.params.agentId
	}).sessionAgentId;
	return params.agentDir ?? params.params.agentDir ?? resolveAgentDir(params.params.config ?? {}, agentId);
}
function buildCodexThreadBindingPolicy(params, preflight) {
	return {
		dynamicToolsFingerprint: preflight.dynamicToolsFingerprint,
		dynamicToolsContainDeferred: preflight.dynamicToolsContainDeferred,
		nativeSkillIsolationFingerprint: preflight.nativeSkillIsolationFingerprint,
		userMcpServersFingerprint: preflight.userMcpServersFingerprint,
		configuredMcpOwnershipVersion: params.configuredMcpOwnershipVersion,
		networkProxyProfileName: params.appServer.networkProxy?.profileName,
		networkProxyConfigFingerprint: preflight.networkProxyConfigFingerprint,
		contextEngine: preflight.contextEngineBinding,
		environmentSelectionFingerprint: preflight.environmentSelectionFingerprint
	};
}
async function prepareCodexThreadFinalConfigPatch(params, nativeModelInputTools, binding) {
	return await params.buildFinalConfigPatch?.({
		...binding ? {
			action: "resume",
			binding
		} : { action: "start" },
		...nativeModelInputTools ? { nativeModelInputTools } : {}
	}, params.client) ?? {
		configPatch: void 0,
		nativeHookRelayGeneration: void 0
	};
}
function buildCodexThreadRequestConfig(params, context, pluginConfigPatch, finalConfigPatch) {
	return applyCodexNativeSkillIsolation(mergeCodexThreadConfigs(params.config, context.userMcpServersConfigPatch, pluginConfigPatch, finalConfigPatch), context.nativeSkillIsolation);
}
async function prepareCodexThreadLifecyclePreflight(params) {
	let effectiveConfig = await assertCodexModelBackedReviewerEffectiveConfig({
		client: params.client,
		approvalsReviewer: params.appServer.approvalsReviewer,
		cwd: params.cwd,
		signal: params.signal
	});
	const nativeHooksRequired = params.nativeHookRelayRequired || params.nativeModelAdmission === "required";
	let modelAdmissionAvailable = params.nativeModelAdmission !== void 0 && (params.nativeModelAdmission !== "disabled" || nativeHooksRequired);
	if (nativeHooksRequired || modelAdmissionAvailable) try {
		await assertCodexNativeHookRelayAllowed(params.client, params.signal);
	} catch (error) {
		if (nativeHooksRequired || !(error instanceof CodexManagedHooksOnlyError)) throw error;
		modelAdmissionAvailable = false;
	}
	const lifecycleTiming = createCodexThreadLifecycleTimingTracker({
		...params.timing,
		enabled: params.timing?.enabled ?? isCodexAppServerProfilerEnabled(params.params.config)
	});
	const legacyDynamicToolsFingerprint = lifecycleTiming.measureSync("legacy-dynamic-tools-fingerprint", () => codexLegacyDynamicToolsFingerprint(params.dynamicTools));
	const dynamicToolsFingerprint = lifecycleTiming.measureSync("dynamic-tools-fingerprint", () => hashCodexAppServerBindingFingerprint(legacyDynamicToolsFingerprint));
	const dynamicToolsContainDeferred = flattenCodexDynamicToolFunctions(params.dynamicTools).some((tool) => tool.deferLoading === true);
	const webSearchPlan = lifecycleTiming.measureSync("web-search-plan", () => resolveCodexWebSearchPlan({
		config: params.params.config,
		disableTools: params.params.disableTools,
		nativeToolSurfaceEnabled: params.nativeCodeModeEnabled,
		nativeProviderWebSearchSupport: params.nativeProviderWebSearchSupport,
		webSearchAllowed: params.webSearchAllowed
	}));
	const webSearchThreadConfigFingerprint = fingerprintJsonObject(webSearchPlan.threadConfig);
	const networkProxyConfigFingerprint = params.appServer.networkProxy?.configFingerprint;
	const contextEngineBinding = lifecycleTiming.measureSync("context-engine-binding", () => buildContextEngineBinding(params.params, params.contextEngineProjection));
	const userMcpServersConfigPatch = params.userMcpServersEnabled === false ? void 0 : await buildCodexUserMcpServersThreadConfigPatchForRun({
		run: params.params,
		cwd: params.cwd,
		agentId: params.agentId ?? params.params.agentId,
		allowLiteralOAuthProjection: params.appServer.connectionClass !== "remote",
		warn: (message) => log.warn(message),
		onServerUnavailable: (serverName, error) => log.warn("skipping unavailable MCP OAuth server", {
			serverName,
			error: formatErrorMessage(error)
		})
	});
	const nativeSkillIsolation = await lifecycleTiming.measure("native-skill-isolation", () => resolveCodexNativeSkillIsolation({
		client: params.client,
		codexHome: params.appServer.start.codexHome ?? params.appServer.start.env?.CODEX_HOME,
		cwd: params.cwd,
		home: params.appServer.start.env?.HOME,
		signal: params.signal,
		userProfile: params.appServer.start.env?.USERPROFILE
	}));
	const nativeSkillIsolationFingerprint = nativeSkillIsolation ? fingerprintJsonObject({
		version: 1,
		disabledUserSkillPaths: nativeSkillIsolation.disabledUserSkillPaths
	}) : void 0;
	const legacyUserMcpServersFingerprint = legacyFingerprintUserMcpServersConfigPatch(userMcpServersConfigPatch);
	const userMcpServersFingerprint = fingerprintUserMcpServersConfigPatch(userMcpServersConfigPatch);
	const environmentSelectionFingerprint = fingerprintEnvironmentSelection(params.environmentSelection);
	const hostSystemAgentActive = params.hostSystemAgentActive ?? isHostScopedAgentToolActive("openclaw");
	const ringZeroActive = hostSystemAgentActive && isSystemAgentOnlyCodexDynamicToolAllowlist(params.params.toolsAllow);
	const messageOnlySourceReply = isMessageOnlyCodexSourceReply(params.params);
	const restrictedToolSurface = ringZeroActive || messageOnlySourceReply || params.params.requireWorkspaceOnly === true || params.params.pluginHarnessToolPolicyRestricted === true;
	const allowConfiguredManagedHooks = params.params.pluginHarnessToolPolicyRestricted === true && params.params.requireWorkspaceOnly !== true && !ringZeroActive && !messageOnlySourceReply && params.params.scheduledRuntimeAuthority === void 0;
	const imageGenerationDenied = params.params.pluginHarnessToolPolicySafeDeniedTools?.includes("image_generate") === true;
	if (restrictedToolSurface && params.nativeCodeModeEnabled !== false) throw new Error("Codex restricted tool surfaces require native code mode to be disabled");
	if (!effectiveConfig) effectiveConfig = await lifecycleTiming.measure("effective-config-read", () => readCodexEffectiveConfig(params.client, params.cwd, { signal: params.signal }));
	params.config = mergeCodexNativeProjectDocThreadConfig(params.config, effectiveConfig);
	if (params.shellEnvironment) params.config = mergeCodexNativeShellEnvironment(params.config, effectiveConfig.config.shell_environment_policy);
	const restrictedToolSurfaceInheritedMcpServerNames = restrictedToolSurface ? await lifecycleTiming.measure("restricted-tool-surface-mcp-policy", () => readCodexInheritedMcpServerNames(params.client, params.cwd, params.signal, effectiveConfig)) : [];
	if (restrictedToolSurface || imageGenerationDenied || params.nativeCodeModeEnabled !== false) await lifecycleTiming.measure("tool-policy-config-requirements-read", () => assertCodexManagedRequirementsDoNotOverrideToolPolicy(params.client, {
		restrictedToolSurface,
		requiredNativeShell: params.nativeCodeModeEnabled !== false,
		additionalDeniedFeatures: imageGenerationDenied ? ["image_generation"] : void 0,
		allowedManagedRequirementsFingerprint: params.params.requireWorkspaceOnly === true ? void 0 : readScheduledCodexAppManagedRequirementsFingerprint(params.params.scheduledRuntimeAuthority),
		allowConfiguredManagedHooks
	}, params.signal));
	const features = effectiveConfig?.config.features;
	if (params.nativeCodeModeEnabled !== false && isJsonObject(features) && features.shell_tool === false && !CODEX_SESSION_OVERRIDABLE_LAYER_TYPES.has(effectiveConfig?.origins?.["features.shell_tool"]?.name.type ?? "")) throw new Error("Codex native code mode requires shell_tool, but the effective shell setting cannot be overridden. Ask your administrator to allow the shell, or select a tool policy that disables native code mode; no automation authority was captured.");
	const ringZeroConfigFingerprint = ringZeroActive ? fingerprintJsonObject({
		version: 1,
		baseInstructions: "",
		config: buildCodexRingZeroThreadConfigPatch(params.params, true, restrictedToolSurfaceInheritedMcpServerNames)
	}) : void 0;
	const ringZeroClientInstanceId = ringZeroActive ? getCodexAppServerClientInstanceId(params.client) : void 0;
	return {
		nativeModelInputTools: nativeHooksRequired || modelAdmissionAvailable ? resolveCodexNativeModelInputTools(effectiveConfig.config) : void 0,
		effectiveConfig,
		contextEngineBinding,
		dynamicToolsContainDeferred,
		dynamicToolsFingerprint,
		environmentSelectionFingerprint,
		hostSystemAgentActive,
		legacyDynamicToolsFingerprint,
		legacyUserMcpServersFingerprint,
		lifecycleTiming,
		nativeSkillIsolation,
		nativeSkillIsolationFingerprint,
		networkProxyConfigFingerprint,
		ringZeroActive,
		ringZeroClientInstanceId,
		ringZeroConfigFingerprint,
		restrictedToolSurface,
		restrictedToolSurfaceInheritedMcpServerNames,
		userMcpServersConfigPatch,
		userMcpServersFingerprint,
		webSearchThreadConfigFingerprint
	};
}
//#endregion
//#region extensions/codex/src/app-server/thread-lifecycle-io.ts
function recordCodexThreadReady(params, context, threadId, action) {
	const { contextEngineBinding, lifecycleTiming } = context;
	const event = {
		sessionId: params.params.sessionId,
		sessionKey: params.params.sessionKey,
		threadId,
		action
	};
	if (contextEngineBinding) log.info("codex app-server wrote context-engine thread binding", {
		...event,
		engineId: contextEngineBinding.engineId,
		epoch: contextEngineBinding.projection?.epoch,
		fingerprint: contextEngineBinding.projection?.fingerprint
	});
	lifecycleTiming.mark("thread-ready");
	lifecycleTiming.logSummary({
		runId: params.params.runId,
		...event
	});
}
async function resumeExistingCodexThread(params, context) {
	const { binding: resumeBinding, bindingIdentity, startModelProvider, dynamicToolsFingerprint, webSearchThreadConfigFingerprint, ringZeroConfigFingerprint, ringZeroClientInstanceId, restrictedToolSurface, lifecycleTiming, normalizeBindingModelProvider, throwIfAborted, stageBindingReplacement } = context;
	let acceptedConfiguration;
	let disposeConfiguration;
	let resumeReservation;
	let ordinaryAppConfigChanged = false;
	let policyOutcome = "not-written";
	const abandonClient = params.abandonClient ?? (() => closeCodexStartupClientBestEffort(params.client));
	try {
		const configuration = await context.prepareResume();
		const assertHandoffCurrent = configuration.assertConfigured;
		disposeConfiguration = configuration.dispose;
		await context.releaseRetainedThread(configuration.assertCurrent);
		configuration.assertCurrent();
		const clientBoundThread = ringZeroClientInstanceId !== void 0 || resumeBinding.ringZeroClientInstanceId !== void 0 || resumeBinding.ringZeroConfigFingerprint !== void 0 || context.ringZeroActive;
		const sharedEntry = getCurrentSharedClientEntry(params.client);
		if (configuration.settledSystemError && !clientBoundThread && resumeBinding.connectionScope !== "supervision" && (!sharedEntry || sharedEntry.activeLeases <= 1 && sharedEntry.pendingAcquires === 0) && !hasCodexAppServerSiblingThreadWork(params.client, resumeBinding.threadId) && !hasCodexAppServerSiblingRouteWork(params.client, resumeBinding.threadId)) {
			await abandonClient();
			throw new CodexThreadClientReplacementError();
		}
		const authProfileId = resumeBinding.connectionScope === "supervision" ? void 0 : params.params.authProfileId ?? resumeBinding.authProfileId;
		const finalConfigPatch = context.prebuiltFinalConfigPatch ?? await prepareCodexThreadFinalConfigPatch(params, context.nativeModelInputTools, resumeBinding);
		const pluginThreadConfig = context.prebuiltPluginThreadConfig ?? (params.pluginThreadConfig?.enabled ? await lifecycleTiming.measure("plugin-config-build", () => params.pluginThreadConfig?.build()) : void 0);
		const resumeConfig = buildCodexThreadRequestConfig(params, context, pluginThreadConfig?.configPatch, finalConfigPatch.configPatch);
		const resumeParams = lifecycleTiming.measureSync("thread-resume-params", () => context.buildResumeParams(resumeBinding, authProfileId, resumeConfig));
		const requestModelProvider = typeof resumeParams.modelProvider === "string" && resumeParams.modelProvider.trim() ? resumeParams.modelProvider : void 0;
		throwIfAborted();
		resumeReservation = params.reserveResumeThread?.(resumeBinding.threadId);
		const response = await lifecycleTiming.measure("thread-resume-request", () => resumeCodexAppServerThread({
			client: params.client,
			abandonClient,
			request: resumeParams,
			signal: params.signal,
			withCurrent: params.authority?.withCurrent,
			assertCurrent: () => {
				configuration.assertCurrent();
				context.assertInferenceConfig(resumeParams.config, requestModelProvider ?? (resumeBinding.preserveNativeModel ? configuration.modelProvider ?? void 0 : void 0));
			}
		}));
		acceptedConfiguration = configuration;
		assertCodexThreadAcceptsDirectInput(response.thread);
		configuration.assertConfigured();
		if (requestModelProvider && response.modelProvider !== requestModelProvider) throw new Error("Codex resumed a different model provider than the one selected for this turn");
		const loadedPluginThreadConfig = await context.buildLoadedPluginThreadConfig?.(resumeBinding);
		if (loadedPluginThreadConfig && loadedPluginThreadConfig.fingerprint !== (pluginThreadConfig?.fingerprint ?? resumeBinding.pluginAppsFingerprint)) {
			ordinaryAppConfigChanged = resumeBinding.connectionScope !== "supervision" && !resumeBinding.pendingResumeConfiguration;
			throw new Error("Codex thread app policy changed; a fresh thread configuration is required");
		}
		const provisionalAppIds = loadedPluginThreadConfig?.provisionalAppIds ?? pluginThreadConfig?.provisionalAppIds ?? [];
		await attestCodexThreadToolSurface({
			client: params.client,
			threadId: response.thread.id,
			appIds: provisionalAppIds,
			signal: params.signal,
			threadConfig: resumeParams.config,
			restrictedToolSurface,
			lifecycleTiming,
			assertCurrent: assertHandoffCurrent,
			withCurrent: params.authority?.withCurrent
		});
		throwIfAborted();
		await refreshCodexThreadPolicy({
			client: params.client,
			threadId: resumeBinding.threadId,
			developerInstructions: resumeParams.developerInstructions,
			timeoutMs: params.appServer.requestTimeoutMs,
			signal: params.signal,
			assertCurrent: assertHandoffCurrent,
			withCurrent: params.authority?.withCurrent
		});
		policyOutcome = "acknowledged";
		assertHandoffCurrent();
		const resumePatch = {
			clientId: resolveCodexAppServerClientInstanceId(params.client),
			pendingResumeConfiguration: void 0,
			...resumeBinding.agentWorkspaceDeveloperInstructions === void 0 && params.agentWorkspaceDeveloperInstructions !== void 0 ? { agentWorkspaceDeveloperInstructions: params.agentWorkspaceDeveloperInstructions } : {},
			cwd: params.cwd,
			rolloutPath: resolveCodexThreadRolloutPath(response.thread) ?? resumeBinding.rolloutPath,
			authProfileId,
			model: resumeParams.model ?? response.model ?? params.params.modelId,
			preserveNativeModel: resumeBinding.preserveNativeModel === true ? true : void 0,
			modelProvider: normalizeBindingModelProvider(authProfileId, response.modelProvider ?? requestModelProvider ?? startModelProvider),
			...buildCodexThreadBindingPolicy(params, context),
			webSearchThreadConfigFingerprint,
			mcpServersFingerprint: params.mcpServersFingerprintEvaluated === true ? params.mcpServersFingerprint : resumeBinding.mcpServersFingerprint,
			ringZeroConfigFingerprint,
			ringZeroClientInstanceId,
			nativeToolPolicyRestricted: restrictedToolSurface ? true : void 0,
			nativeHookRelayGeneration: finalConfigPatch.nativeHookRelayGeneration ?? resumeBinding.nativeHookRelayGeneration,
			appServerRuntimeFingerprint: resumeBinding.connectionScope === "supervision" ? buildCodexAppServerConnectionFingerprint(params.appServer, params.params.agentDir) : params.appServerRuntimeFingerprint,
			pluginAppsFingerprint: pluginThreadConfig?.fingerprint ?? resumeBinding.pluginAppsFingerprint,
			pluginAppsInputFingerprint: pluginThreadConfig?.inputFingerprint ?? resumeBinding.pluginAppsInputFingerprint,
			pluginAppPolicyContext: pluginThreadConfig?.policyContext ?? resumeBinding.pluginAppPolicyContext
		};
		if (!await lifecycleTiming.measure("thread-resume-write-binding", () => params.bindingStore.mutate(bindingIdentity, {
			kind: "patch",
			threadId: resumeBinding.threadId,
			patch: resumePatch
		}, assertHandoffCurrent, params.authority))) throw new CodexThreadBindingConflictError(resumeBinding.threadId, "committing a resumed thread");
		assertHandoffCurrent();
		recordCodexThreadReady(params, context, response.thread.id, "resumed");
		const activeTurnIds = readActiveCodexTurnIdsFromResume(response);
		return {
			...resumeBinding,
			threadId: response.thread.id,
			...resumePatch,
			liveThreadConfigFingerprint: fingerprintCodexThreadConfig(resumeParams, authProfileId, dynamicToolsFingerprint, {
				model: response.model,
				modelProvider: resumePatch.modelProvider ?? null,
				preserveNativeModel: resumeBinding.preserveNativeModel
			}),
			lifecycle: {
				action: "resumed",
				...activeTurnIds.length ? { activeTurnIds } : {}
			}
		};
	} catch (error) {
		resumeReservation?.release();
		if (!acceptedConfiguration && (!(error instanceof CodexAppServerRpcError) || error.method === "thread/read" && !isCodexThreadReadMissingError(error, resumeBinding.threadId) || isCodexAppServerOverloadError(error))) throw error;
		if (acceptedConfiguration) {
			const handoffError = error instanceof CodexThreadPolicyHandoffError || error instanceof CodexAppServerUnsafeSubscriptionError ? error : new CodexThreadPolicyHandoffError(policyOutcome, error);
			const subscriptionReleased = await unsubscribeCodexThreadBestEffort(params.client, {
				threadId: resumeBinding.threadId,
				timeoutMs: CODEX_APP_SERVER_UNSUBSCRIBE_TIMEOUT_MS,
				assertCurrent: acceptedConfiguration.assertCurrent,
				withCurrent: params.authority?.withCurrent
			}).catch(() => false);
			if (!subscriptionReleased || handoffError instanceof CodexThreadPolicyHandoffError && handoffError.outcome === "unknown") {
				if (resumeBinding.connectionScope === "supervision") await retireUnsafeCodexTurnClientBestEffort(params.client, "session policy handoff");
				else try {
					await abandonClient();
				} catch (cause) {
					throw new CodexThreadPolicyHandoffError(handoffError instanceof CodexThreadPolicyHandoffError ? handoffError.outcome : policyOutcome, new AggregateError([handoffError, cause], "Codex thread/resume client could not be retired"));
				}
			}
			if (!ordinaryAppConfigChanged || !subscriptionReleased) throw handoffError;
			acceptedConfiguration.assertConfigured();
		}
		if (resumeBinding.pendingResumeConfiguration || resumeBinding.preserveNativeModel || resumeBinding.connectionScope === "supervision" || params.signal?.aborted) throw error;
		log.warn("codex app-server thread resume failed; starting a new thread", { error });
		stageBindingReplacement("rotating a stale thread binding");
	} finally {
		disposeConfiguration?.();
	}
}
async function startFreshCodexThread(params, context) {
	const clientId = resolveCodexAppServerClientInstanceId(params.client);
	const { bindingIdentity, startModelSelection, startModelProvider, dynamicToolsFingerprint, webSearchThreadConfigFingerprint, ringZeroConfigFingerprint, ringZeroClientInstanceId, contextEngineBinding, hostSystemAgentActive, restrictedToolSurface, restrictedToolSurfaceInheritedMcpServerNames, lifecycleTiming, normalizeBindingModelProvider, throwIfAborted, prebuiltPluginThreadConfig, preserveExistingBinding, rotatedContextEngineBinding, replacementPredecessor } = context;
	const pluginThreadConfig = params.pluginThreadConfig?.enabled ? prebuiltPluginThreadConfig ?? await lifecycleTiming.measure("plugin-config-build", () => params.pluginThreadConfig?.build()) : void 0;
	const finalConfigPatch = await prepareCodexThreadFinalConfigPatch(params, context.nativeModelInputTools);
	const config = lifecycleTiming.measureSync("merge-thread-config", () => buildCodexThreadRequestConfig(params, context, pluginThreadConfig?.configPatch, finalConfigPatch.configPatch));
	const startParams = lifecycleTiming.measureSync("thread-start-params", () => buildThreadStartParams(params.params, {
		...params,
		config,
		model: startModelSelection.model,
		modelProvider: startModelProvider,
		hostSystemAgentActive,
		restrictedToolSurfaceInheritedMcpServerNames
	}));
	const requestModelProvider = typeof startParams.modelProvider === "string" && startParams.modelProvider.trim() ? startParams.modelProvider : void 0;
	const assertCurrent = () => {
		throwIfAborted();
		params.params.hostCapabilities.assertActive();
		params.assertCurrent?.();
	};
	const assertInferenceCurrent = () => {
		assertCurrent();
		context.assertInferenceConfig(startParams.config, requestModelProvider);
	};
	const threadStartResponse = await lifecycleTiming.measure("thread-start-request", async () => {
		try {
			assertCurrent();
			return await params.client.request("thread/start", startParams, {
				signal: params.signal,
				assertCurrent: assertInferenceCurrent,
				withCurrent: params.authority?.withCurrent
			});
		} catch (error) {
			if (error instanceof CodexAppServerRpcError) throw new CodexThreadStartRequestError(error);
			throw error;
		}
	});
	const response = assertCodexThreadStartResponse(threadStartResponse);
	const provisionalAppIds = pluginThreadConfig?.provisionalAppIds;
	const rejectUncommittedThread = async (cause) => {
		if (!await discardUnattestedCodexPluginThread({
			client: params.client,
			threadId: response.thread.id,
			ephemeral: startParams.ephemeral === true
		})) {
			await (params.abandonClient ?? (() => closeCodexStartupClientBestEffort(params.client)))();
			throw new CodexAppServerUnsafeSubscriptionError("Codex uncommitted thread cleanup failed", { cause });
		}
		throw cause;
	};
	try {
		await attestCodexThreadToolSurface({
			client: params.client,
			threadId: response.thread.id,
			appIds: provisionalAppIds ?? [],
			signal: params.signal,
			threadConfig: startParams.config,
			restrictedToolSurface,
			lifecycleTiming,
			assertCurrent,
			withCurrent: params.authority?.withCurrent
		});
		assertCurrent();
	} catch (error) {
		return await rejectUncommittedThread(error);
	}
	const rolloutPath = resolveCodexThreadRolloutPath(response.thread);
	const modelProvider = resolveCodexAppServerModelProvider({
		homeScope: params.appServer.start.homeScope,
		provider: params.params.provider,
		authProfileId: params.params.authProfileId,
		authProfileStore: params.params.authProfileStore,
		agentDir: params.params.agentDir,
		config: params.params.config
	});
	const bindingModelProvider = normalizeBindingModelProvider(params.params.authProfileId, response.modelProvider ?? requestModelProvider ?? startModelProvider ?? modelProvider);
	const nextMcpServersFingerprint = params.mcpServersFingerprintEvaluated === true ? params.mcpServersFingerprint : void 0;
	const startedBinding = {
		threadId: response.thread.id,
		...clientId ? { clientId } : {},
		cwd: params.cwd,
		...rolloutPath ? { rolloutPath } : {},
		authProfileId: params.params.authProfileId,
		agentWorkspaceDeveloperInstructions: params.agentWorkspaceDeveloperInstructions,
		model: response.model ?? startParams.model ?? params.params.modelId,
		modelProvider: bindingModelProvider,
		...buildCodexThreadBindingPolicy(params, context),
		mcpServersFingerprint: nextMcpServersFingerprint,
		ringZeroConfigFingerprint,
		ringZeroClientInstanceId,
		nativeHookRelayGeneration: finalConfigPatch.nativeHookRelayGeneration,
		appServerRuntimeFingerprint: params.appServerRuntimeFingerprint,
		pluginAppsFingerprint: pluginThreadConfig?.fingerprint,
		pluginAppsInputFingerprint: pluginThreadConfig?.inputFingerprint,
		pluginAppPolicyContext: pluginThreadConfig?.policyContext
	};
	if (!preserveExistingBinding) {
		const nextBinding = {
			...startedBinding,
			webSearchThreadConfigFingerprint,
			nativeToolPolicyRestricted: restrictedToolSurface ? true : void 0
		};
		const managedSourceHomeId = codexCatalogHomeId(resolveCodexAppServerLocalHomeDir(params.appServer.start, resolveCodexThreadAgentDir(params)));
		let committed;
		try {
			await lifecycleTiming.measure("thread-start-mark-managed", () => params.bindingStore.managedThreads?.mark({
				sourceHomeId: managedSourceHomeId,
				threadId: response.thread.id,
				...rolloutPath ? { rolloutPath } : {}
			}));
			committed = await lifecycleTiming.measure("thread-start-write-binding", () => params.bindingStore.mutate(bindingIdentity, replacementPredecessor ? {
				kind: "replace-thread",
				expectedThreadId: replacementPredecessor.threadId,
				binding: nextBinding
			} : {
				kind: "set",
				if: { kind: "absent" },
				binding: nextBinding
			}, assertCurrent, params.authority));
		} catch (error) {
			return await rejectUncommittedThread(error);
		}
		if (!committed) return await rejectUncommittedThread(new CodexThreadBindingConflictError(replacementPredecessor?.threadId ?? response.thread.id, "committing a fresh thread"));
	}
	recordCodexThreadReady(params, {
		lifecycleTiming,
		contextEngineBinding: preserveExistingBinding ? void 0 : contextEngineBinding
	}, response.thread.id, rotatedContextEngineBinding ? "rotated" : "started");
	return {
		...startedBinding,
		modelProvider: response.modelProvider ?? requestModelProvider ?? startModelProvider ?? modelProvider,
		liveThreadEphemeralPolicy: startParams.ephemeral ? createCodexEphemeralThreadPolicy(params) : void 0,
		...!preserveExistingBinding ? { liveThreadConfigFingerprint: fingerprintCodexThreadConfig(startParams, params.params.authProfileId, dynamicToolsFingerprint, {
			model: response.model,
			modelProvider: bindingModelProvider ?? null
		}) } : {},
		lifecycle: {
			action: "started",
			...preserveExistingBinding ? { preserveExistingBinding: true } : {},
			...rotatedContextEngineBinding ? { rotatedContextEngineBinding: true } : {}
		}
	};
}
//#endregion
//#region extensions/codex/src/app-server/thread-lifecycle-warm.ts
/** Preserves the caller's abort reason across thread ownership transitions. */
function throwIfCodexThreadLifecycleAborted(signal) {
	if (signal?.aborted) throw codexThreadLifecycleAbortError(signal);
}
function codexThreadLifecycleAbortError(signal) {
	const reason = signal.reason;
	if (reason instanceof Error) return reason;
	const error = new Error(typeof reason === "string" && reason.length > 0 ? reason : "codex app-server thread lifecycle aborted");
	error.name = "AbortError";
	return error;
}
/** Releases consumed subscription ownership or retires an unsafe client. */
async function releaseCodexConsumedLiveThread(options) {
	if (await options.lifecycleTiming.measure("retained-thread-unsubscribe", () => unsubscribeCodexThreadBestEffort(options.client, {
		threadId: options.threadId,
		timeoutMs: 5e3,
		assertCurrent: options.assertCurrent,
		withCurrent: options.withCurrent
	}))) return;
	return await abandonCodexLiveThreadRelease(options);
}
async function abandonCodexLiveThreadRelease(options, cause) {
	options.assertCurrent?.();
	await (options.abandonClient ?? (() => closeCodexStartupClientBestEffort(options.client)))();
	throw new CodexAppServerUnsafeSubscriptionError(`Codex retained thread subscription could not be released: ${options.threadId}`, cause !== void 0 ? { cause } : void 0);
}
/** Releases through the retained owner, preserving its guarded callback and rollback. */
async function releaseCodexRetainedLiveThread(options) {
	try {
		return await options.lifecycleTiming.measure("retained-thread-unsubscribe", () => releaseCodexAppServerLiveThread(options.client, options.threadId, options.assertCurrent, options.withCurrent));
	} catch (error) {
		if (error instanceof CodexAppServerUnsafeSubscriptionError) throw error;
		return await abandonCodexLiveThreadRelease(options, error);
	}
}
/** Release follows the physical owner across connection rotation, never a copied thread id. */
async function releaseCodexBoundLiveThread(options) {
	const changedClient = options.ownerClientId && options.ownerClientId !== options.clientId;
	const previous = changedClient ? await retainSharedCodexAppServerClientByInstanceId(options.ownerClientId, {
		signal: options.signal,
		createAbortError: codexThreadLifecycleAbortError
	}) : void 0;
	if (changedClient && !previous) return false;
	const client = previous?.client ?? options.client;
	let threadClosed;
	let stopWatching;
	let stopReading;
	if (previous) {
		threadClosed = new Promise((resolve) => {
			stopWatching = client.addNotificationHandler((notification) => {
				const threadId = notification.params && typeof notification.params === "object" ? Reflect.get(notification.params, "threadId") : void 0;
				if (isCodexAppServerThreadTerminalNotification(notification.method) && threadId === options.threadId) resolve();
			});
		});
		if (wasCodexAppServerThreadClosed(client, options.threadId)) threadClosed = Promise.resolve();
	}
	try {
		if (isCodexAppServerLiveThreadClaimed(client, options.threadId) || isCodexAppServerLiveThreadProtected(client, options.threadId)) throw new Error(`Codex thread ${options.threadId} is claimed by active work; stop it first.`);
		return await releaseCodexRetainedLiveThread({
			...options,
			client,
			abandonClient: previous ? void 0 : options.abandonClient,
			assertCurrent: options.assertCurrent ? () => {
				options.assertCurrent?.();
				const closed = previous?.client.getCloseError();
				if (closed) throw closed;
			} : void 0
		});
	} finally {
		try {
			const retiredExit = previous?.release(!isCodexAppServerLiveThreadClaimed(client, options.threadId) && !isCodexAppServerLiveThreadProtected(client, options.threadId));
			if (retiredExit) {
				const stopped = threadClosed ? [retiredExit, threadClosed] : [retiredExit];
				if (!client.getCloseError() && !wasCodexAppServerThreadClosed(client, options.threadId)) {
					const readController = new AbortController();
					stopReading = () => readController.abort();
					const signal = options.signal ? AbortSignal.any([options.signal, readController.signal]) : readController.signal;
					stopped.push(client.request("thread/read", {
						threadId: options.threadId,
						includeTurns: false
					}, {
						signal,
						assertCurrent: options.assertCurrent,
						withCurrent: options.withCurrent
					}).then(({ thread }) => {
						if (thread.id !== options.threadId) throw new Error("Codex returned another thread during retired-owner handoff");
						return thread.status?.type === "notLoaded" ? void 0 : retiredExit;
					}, () => retiredExit));
				}
				await options.lifecycleTiming.measure("retired-thread-runtime-release", () => racePromiseWithAbortSignal(Promise.race(stopped), options.signal, codexThreadLifecycleAbortError));
			}
		} finally {
			stopReading?.();
			stopWatching?.();
		}
	}
}
/** Reuses one safely owned, fully matching subscription on its original client. */
async function tryReuseCodexLiveThread(options) {
	const { params, binding, bindingIdentity, clientId, dynamicToolsFingerprint, environmentSelectionFingerprint, lifecycleTiming, ringZeroActive, restrictedToolSurface, startModelSelection, throwIfAborted } = options;
	const incognito = isIncognitoSessionKey(params.params.sessionKey);
	if (incognito && (binding.preserveNativeModel || binding.connectionScope === "supervision")) {
		if (binding.clientId === clientId && binding.clientId && ((await options.buildLoadedPluginThreadConfig(binding))?.fingerprint ?? binding.pluginAppsFingerprint) === binding.pluginAppsFingerprint) {
			await params.buildFinalConfigPatch?.({
				action: "resume",
				binding,
				...options.nativeModelInputTools ? { nativeModelInputTools: options.nativeModelInputTools } : {}
			}, params.client);
			throwIfAborted();
			params.assertCurrent?.();
			return {
				kind: "ready",
				binding: {
					...binding,
					lifecycle: { action: "resumed" }
				}
			};
		}
		return { kind: "rotate" };
	}
	if (!binding.clientId || binding.clientId !== clientId || ringZeroActive && !incognito) return { kind: "resume" };
	const retainedThread = await consumeCodexAppServerLiveThread(params.client, binding.threadId);
	if (!retainedThread) return { kind: "resume" };
	const assertWarmOwner = () => {
		throwIfAborted();
		if (!isCodexAppServerClientRuntimeLive(params.client)) throw params.client.getCloseError() ?? /* @__PURE__ */ new Error("codex app-server client is closed");
		try {
			retainedThread.assertCurrent();
			params.params.hostCapabilities.assertActive();
			params.assertCurrent?.();
		} catch (cause) {
			throw new AgentHarnessPreflightError("Codex warm thread ownership changed before this turn could run. No turn was sent; reconnect before continuing, or start a new conversation if the original thread was closed.", { cause });
		}
	};
	let ownershipTransferred = false;
	let preserveSubscription = false;
	let nativeThread;
	const cleanup = async (retainSubscription, ownership = retainedThread) => {
		let failure;
		try {
			let pendingRetention;
			if (retainSubscription) {
				const retain = () => {
					assertWarmOwner();
					if (isSameCodexAppServerThreadOwner(params.bindingStore.read(bindingIdentity), binding)) pendingRetention = retainCodexAppServerBindingSubscription(params.client, binding.threadId, ownership);
				};
				try {
					if (params.authority) await params.authority.withCurrent(retain);
					else retain();
				} catch {}
			}
			if (pendingRetention) {
				if (!await pendingRetention) failure = { cause: /* @__PURE__ */ new Error("Codex live thread ownership could not be returned to its session") };
			} else await retainedThread.release(binding.threadId);
		} catch (cause) {
			failure = { cause };
		}
		if (failure) await abandonCodexLiveThreadRelease({
			client: params.client,
			abandonClient: params.abandonClient,
			lifecycleTiming,
			threadId: binding.threadId
		}, failure.cause);
	};
	try {
		assertWarmOwner();
		if (binding.preserveNativeModel || binding.connectionScope === "supervision") {
			try {
				nativeThread = await assertAdoptedCodexThreadResumeAllowed(params, binding.threadId, options, assertWarmOwner);
			} catch (error) {
				assertWarmOwner();
				preserveSubscription = isSameCodexAppServerThreadOwner(params.bindingStore.read(bindingIdentity), binding);
				throw error;
			}
			assertWarmOwner();
			if (nativeThread.status?.type === "notLoaded") {
				preserveSubscription = true;
				return { kind: "resume" };
			}
		}
		const pluginThreadConfig = await options.buildLoadedPluginThreadConfig(binding);
		assertWarmOwner();
		if (pluginThreadConfig && pluginThreadConfig.fingerprint !== binding.pluginAppsFingerprint) {
			preserveSubscription = true;
			return { kind: "rotate" };
		}
		const prebuiltFinalConfigPatch = await prepareCodexThreadFinalConfigPatch(params, options.nativeModelInputTools, binding);
		const pluginAppsConfigPatch = pluginThreadConfig?.configPatch ?? (params.pluginThreadConfig?.enabled && binding.pluginAppPolicyContext ? buildCodexPluginAppsConfigPatchFromPolicyContext(binding.pluginAppPolicyContext) : void 0);
		const resumeAuthProfileId = binding.connectionScope === "supervision" ? void 0 : params.params.authProfileId ?? binding.authProfileId;
		const resumeConfig = buildCodexThreadRequestConfig(params, options, pluginAppsConfigPatch, prebuiltFinalConfigPatch.configPatch);
		const resumeParams = lifecycleTiming.measureSync("warm-thread-resume-params", () => options.buildResumeParams(binding, resumeAuthProfileId, resumeConfig));
		options.assertInferenceConfig(resumeParams.config, resumeParams.modelProvider ?? (binding.preserveNativeModel ? nativeThread?.modelProvider?.trim() || binding.modelProvider : void 0));
		const liveThreadConfigFingerprint = incognito ? retainedThread.configFingerprint : fingerprintCodexThreadConfig(resumeParams, resumeAuthProfileId, dynamicToolsFingerprint, binding);
		const ephemeralPolicy = retainedThread.ephemeralPolicy;
		if (incognito && (!ephemeralPolicy || ephemeralPolicy.developerInstructions !== params.developerInstructions || getCodexInferenceThread(params.client, binding.threadId) !== params.inferenceRoute || [...params.inferenceProviderRoutes?.keys() ?? []].some((provider) => !getCodexInferenceThreadQualification(params.client, binding.threadId)?.hasProvider(provider)))) {
			preserveSubscription = true;
			throw new CodexIncognitoPolicyChangeError();
		}
		if (!incognito && retainedThread.configFingerprint !== liveThreadConfigFingerprint) {
			preserveSubscription = true;
			return {
				kind: "resume",
				prebuiltFinalConfigPatch
			};
		}
		try {
			await attestCodexThreadToolSurface({
				client: params.client,
				threadId: binding.threadId,
				appIds: pluginThreadConfig?.provisionalAppIds ?? [],
				signal: params.signal,
				threadConfig: resumeParams.config,
				restrictedToolSurface,
				lifecycleTiming,
				assertCurrent: assertWarmOwner,
				withCurrent: params.authority?.withCurrent
			});
		} catch (error) {
			assertWarmOwner();
			throw error;
		}
		assertWarmOwner();
		if (ephemeralPolicy && ephemeralPolicy.refreshableInstructions !== params.refreshableInstructions) try {
			await refreshCodexThreadInstructions({
				client: params.client,
				threadId: binding.threadId,
				refreshableInstructions: params.refreshableInstructions,
				timeoutMs: params.appServer.requestTimeoutMs,
				signal: params.signal,
				assertCurrent: assertWarmOwner,
				withCurrent: params.authority?.withCurrent
			});
		} catch (error) {
			preserveSubscription = true;
			throw error;
		}
		const nativeHookRelayGeneration = prebuiltFinalConfigPatch.nativeHookRelayGeneration ?? binding.nativeHookRelayGeneration;
		const model = binding.preserveNativeModel ? nativeThread?.model?.trim() || binding.model : startModelSelection.model;
		const modelProvider = binding.preserveNativeModel ? nativeThread?.modelProvider?.trim() || binding.modelProvider : binding.modelProvider;
		const bindingPatch = {
			cwd: params.cwd,
			model,
			modelProvider,
			nativeHookRelayGeneration,
			environmentSelectionFingerprint
		};
		if (!(incognito || await lifecycleTiming.measure("warm-thread-write-binding", () => params.bindingStore.mutate(bindingIdentity, {
			kind: "patch",
			threadId: binding.threadId,
			patch: bindingPatch
		}, assertWarmOwner, params.authority)))) throw new CodexThreadBindingConflictError(binding.threadId, "committing a reused thread");
		assertWarmOwner();
		lifecycleTiming.mark("thread-ready");
		lifecycleTiming.logSummary({
			runId: params.params.runId,
			sessionId: params.params.sessionId,
			sessionKey: params.params.sessionKey,
			threadId: binding.threadId,
			action: "resumed"
		});
		const liveThreadEphemeralPolicy = ephemeralPolicy && {
			...ephemeralPolicy,
			refreshableInstructions: params.refreshableInstructions
		};
		ownershipTransferred = true;
		return {
			kind: "ready",
			cleanupOnFailure: () => cleanup(isCodexAppServerLiveThreadProtected(params.client, binding.threadId), {
				...retainedThread,
				configFingerprint: liveThreadConfigFingerprint,
				ephemeralPolicy: liveThreadEphemeralPolicy
			}),
			binding: {
				...binding,
				...!incognito ? bindingPatch : {},
				liveThreadConfigFingerprint,
				liveThreadEphemeralPolicy,
				liveThreadOwnership: retainedThread,
				...!incognito && retainedThread.serviceTier && resumeParams.serviceTier === void 0 ? { clearInheritedServiceTier: true } : {},
				lifecycle: { action: "resumed" }
			}
		};
	} finally {
		if (!ownershipTransferred) await cleanup(preserveSubscription);
	}
}
//#endregion
//#region extensions/codex/src/app-server/thread-lifecycle-adoption.ts
/** All bound preparation follows attach's native-queue-before-binding-lease order. */
async function withCodexThreadLifecycleBinding(params, run) {
	const identity = sessionBindingIdentity({
		sessionId: params.params.sessionId,
		sessionKey: params.params.sessionKey,
		agentId: params.agentId ?? params.params.agentId,
		config: params.params.config
	});
	const { binding: snapshot, authority } = await resolveCodexSessionBinding({
		reclaimStale: true,
		authority: params.authority,
		bindingStore: params.bindingStore,
		identity,
		config: params.params.config,
		storePath: params.params.sessionTarget?.storePath,
		assertCurrent: () => {
			params.params.hostCapabilities.assertActive();
			params.assertCurrent?.();
		},
		signal: params.signal,
		assertBinding: params.params.expectedSessionRuntimeOwnership ? (binding) => assertCodexSessionRuntimeOwnership(binding, params.params.expectedSessionRuntimeOwnership) : void 0
	});
	const assertCurrent = authority.assertCurrent;
	const runWithLease = () => params.bindingStore.withLease(identity, async () => {
		const binding = params.bindingStore.read(identity);
		assertCodexSessionRuntimeOwnership(binding, params.params.expectedSessionRuntimeOwnership);
		if (binding?.threadId !== snapshot?.threadId || binding?.clientId !== snapshot?.clientId) throw new CodexThreadBindingConflictError(binding?.threadId ?? snapshot?.threadId ?? params.params.sessionId, "acquiring thread lifecycle ownership");
		assertCurrent();
		return await run(identity, binding, authority);
	}, {
		assertCurrent,
		authority
	});
	return snapshot?.pendingResumeConfiguration ? await withExclusiveCodexAppServerThread({
		bindingStore: params.bindingStore,
		identity,
		threadId: snapshot.threadId,
		run: runWithLease
	}) : snapshot ? await withCodexAppServerThreadMutation(snapshot.threadId, runWithLease) : await runWithLease();
}
/** Completes manual attachment only under the native queue and exact binding lease. */
async function resumePendingCodexThread(params, context) {
	const { binding, contextEngineBinding, lifecycleTiming, restrictedToolSurface } = context;
	if (isIncognitoSessionKey(params.params.sessionKey) || context.transientRestriction || !restrictedToolSurface && binding.nativeToolPolicyRestricted === true || (contextEngineBinding ? !isContextEngineBindingCompatible(binding.contextEngine, contextEngineBinding) : binding.contextEngine !== void 0) || shouldRotateCodexGpt56MultiAgentBinding({
		bindingModel: binding.model,
		requestedModel: params.params.modelId
	})) throw new Error(`Cannot configure resumed Codex thread ${binding.threadId} under a transient or incompatible session policy. The thread is preserved; retry from its normal session or use /new for the current policy.`);
	const prebuiltPluginThreadConfig = params.pluginThreadConfig?.enabled ? await lifecycleTiming.measure("plugin-config-build", () => params.pluginThreadConfig?.build()) : void 0;
	const clientId = resolveCodexAppServerClientInstanceId(params.client);
	const resumed = await resumeExistingCodexThread(params, {
		...context,
		prebuiltPluginThreadConfig,
		prepareResume: () => preparePendingCodexThreadResume(params, binding, context.dynamicToolsFingerprint),
		releaseRetainedThread: async (assertCurrent) => {
			const released = await context.releaseRetainedThread(binding.threadId, assertCurrent);
			assertCurrent();
			if (!released || binding.clientId && binding.clientId !== clientId) await releaseCodexConsumedLiveThread({
				client: params.client,
				abandonClient: params.abandonClient,
				lifecycleTiming,
				threadId: binding.threadId,
				assertCurrent,
				withCurrent: params.authority?.withCurrent
			});
		}
	});
	if (!resumed) throw new Error(`Codex did not configure resumed thread ${binding.threadId}.`);
	return resumed;
}
/** Manual attachment is intent, never evidence that loaded native overrides took effect. */
async function preparePendingCodexThreadResume(params, binding, dynamicToolsFingerprint) {
	const fail = (reason) => /* @__PURE__ */ new Error(`Cannot configure resumed Codex thread ${binding.threadId}: ${reason}. The thread is preserved; continue it in native Codex or use /new for the current OpenClaw tools.`);
	const agentDir = resolveCodexThreadAgentDir(params);
	const localHome = resolveCodexAppServerLocalHomeDir(params.appServer.start, agentDir);
	if (params.appServer.start.transport !== "stdio" || params.appServer.start.homeScope === "user" || path.resolve(localHome) !== resolveCodexAppServerHomeDir(agentDir) || binding.connectionScope === "supervision" || binding.preserveNativeModel === true) throw fail("configuration adoption requires an OpenClaw-owned local Codex home");
	if (isCodexAppServerLiveThreadClaimed(params.client, binding.threadId)) throw fail("the thread is claimed by active work; stop that run before resuming");
	const assertCurrent = captureCodexThreadResumeAuthority(params, binding, "native-process");
	assertCurrent();
	const { thread } = await params.client.request("thread/read", {
		threadId: binding.threadId,
		includeTurns: false
	}, {
		signal: params.signal,
		assertCurrent,
		withCurrent: params.authority?.withCurrent
	});
	assertCurrent();
	if (thread.id !== binding.threadId || !isCodexThreadNonRunning(thread.status)) throw fail("the native thread is not idle; wait for its current run to finish");
	assertCodexThreadAcceptsDirectInput(thread);
	const observation = observeCodexThreadConfiguration(params, thread, assertCurrent);
	try {
		const rolloutPath = thread.path ?? binding.rolloutPath;
		const metadata = rolloutPath ? await readCodexSessionMeta(path.join(localHome, "sessions"), rolloutPath, binding.threadId) : void 0;
		if (!metadata) throw fail("its native tool catalog could not be read from the selected Codex home");
		const recordedTools = metadata.dynamic_tools ?? [];
		if (!Array.isArray(recordedTools) || codexDynamicToolsFingerprint(recordedTools) !== dynamicToolsFingerprint) throw fail("its immutable native tool catalog does not match the current OpenClaw tools");
		assertCurrent();
		return {
			...observation,
			assertCurrent
		};
	} catch (error) {
		observation.dispose();
		throw error;
	}
}
/** Observe teardown before release; a successful resume alone can acknowledge ignored overrides. */
async function prepareCodexThreadResume(params, binding, context) {
	const assertCurrent = captureCodexThreadResumeAuthority(params, binding, binding.connectionScope === "supervision" ? "connection" : "thread-configuration");
	assertCurrent();
	let thread;
	try {
		thread = await assertAdoptedCodexThreadResumeAllowed(params, binding.threadId, context, assertCurrent);
	} finally {
		assertCurrent();
	}
	assertCodexSupervisionThreadLineage(binding, thread);
	return {
		...observeCodexThreadConfiguration(params, thread, assertCurrent),
		assertCurrent
	};
}
function captureCodexThreadResumeAuthority(params, binding, scope) {
	const assertClient = captureCodexAppServerClientLifetime(params.client, scope);
	return () => {
		params.params.hostCapabilities.assertActive();
		params.assertCurrent?.();
		params.signal?.throwIfAborted();
		assertClient();
		if (isCodexAppServerLiveThreadClaimed(params.client, binding.threadId)) throw new CodexAdoptedThreadActiveError();
	};
}
function isCodexThreadNonRunning(status) {
	return status?.type === "idle" || status?.type === "notLoaded" || status?.type === "systemError";
}
function observeCodexThreadConfiguration(params, thread, assertCurrent) {
	if (!isCodexThreadNonRunning(thread.status)) throw new CodexAdoptedThreadActiveError();
	const settledSystemError = thread.status.type === "systemError";
	let unloaded = thread.status.type === "notLoaded";
	const dispose = params.client.addNotificationHandler((notification) => {
		if (notification.method === "thread/status/changed" && isJsonObject(notification.params) && notification.params.threadId === thread.id && isJsonObject(notification.params.status) && notification.params.status.type === "notLoaded") unloaded = true;
	});
	return {
		modelProvider: thread.modelProvider,
		dispose,
		settledSystemError,
		assertConfigured: () => {
			assertCurrent();
			if (!unloaded) throw new Error("Codex did not confirm unloading its previous configuration. The thread is preserved; stop competing native work and reconnect before retrying.");
		}
	};
}
//#endregion
//#region extensions/codex/src/app-server/thread-lifecycle-projection.ts
/** Projection identity omits persistent instructions: qualify using warm reuse's full policy. */
async function canRetainCodexProjectionBackgroundWork(params, binding, context, pluginThreadConfig) {
	const finalConfig = await prepareCodexThreadFinalConfigPatch(params, context.nativeModelInputTools, binding);
	const pluginConfig = pluginThreadConfig?.configPatch ?? (params.pluginThreadConfig?.enabled && binding.pluginAppPolicyContext ? buildCodexPluginAppsConfigPatchFromPolicyContext(binding.pluginAppPolicyContext) : void 0);
	const authProfileId = binding.connectionScope === "supervision" ? void 0 : params.params.authProfileId ?? binding.authProfileId;
	const resumeParams = context.buildResumeParams(binding, authProfileId, buildCodexThreadRequestConfig(params, context, pluginConfig, finalConfig.configPatch));
	return isCodexAppServerLiveThreadBackgroundOnly(params.client, binding.threadId, fingerprintCodexThreadConfig(resumeParams, authProfileId, context.dynamicToolsFingerprint, binding));
}
//#endregion
//#region extensions/codex/src/app-server/thread-supervision-cleanup.ts
function withPendingSupervisionCleanup(pending, cleanupThreadIds) {
	return {
		sourceThreadId: pending.sourceThreadId,
		...pending.connectionFingerprint ? { connectionFingerprint: pending.connectionFingerprint } : {},
		...pending.lastTurnId ? { lastTurnId: pending.lastTurnId } : {},
		...cleanupThreadIds.length > 0 ? { cleanupThreadIds } : {}
	};
}
async function cleanPendingSupervisionArtifacts(client, pending) {
	const remaining = [];
	for (const threadId of pending.cleanupThreadIds ?? []) try {
		await client.request("thread/archive", { threadId }, { timeoutMs: CODEX_APP_SERVER_UNSUBSCRIBE_TIMEOUT_MS });
	} catch (error) {
		const message = formatErrorMessage(error).toLowerCase();
		if (message.includes("no rollout found for thread id") || message.includes("thread not found") || message.includes("already archived")) continue;
		await unsubscribeCodexThreadBestEffort(client, {
			threadId,
			timeoutMs: CODEX_APP_SERVER_UNSUBSCRIBE_TIMEOUT_MS
		});
		log.warn("failed to archive temporary Codex supervision thread", {
			threadId,
			error
		});
		remaining.push(threadId);
	}
	return remaining;
}
//#endregion
//#region extensions/codex/src/app-server/thread-supervision.ts
async function materializePendingSupervisionBranch(params) {
	let pending = params.binding.pendingSupervisionBranch;
	const requestOptions = {
		signal: params.signal,
		assertCurrent: params.throwIfAborted,
		withCurrent: params.authority?.withCurrent
	};
	const requestCreatedThread = (kind, request) => params.lifecycleTiming.measure(kind === "probe" ? "supervision-model-probe-fork" : "supervision-thread-start", async () => {
		try {
			return await request();
		} catch (error) {
			if (error instanceof CodexAppServerRpcError) throw kind === "probe" ? error : new CodexThreadStartRequestError(error);
			throw new CodexAppServerUnsafeSubscriptionError(kind === "probe" ? "Codex model test fork may have materialized without a response" : "Canonical Codex branch may have started without a response", { cause: error });
		}
	});
	const attestRestrictedToolSurface = (threadId, config) => params.lifecycleTiming.measure("restricted-tool-surface-mcp-attestation", () => attestCodexRestrictedToolSurfaceMcpServersDisabled(params.client, threadId, config ?? void 0, params.signal));
	const connectionFingerprint = buildCodexAppServerConnectionFingerprint(params.appServer, params.attempt.agentDir);
	if (!pending.connectionFingerprint || pending.connectionFingerprint !== connectionFingerprint) throw new Error("Codex supervision source connection changed before branch materialization");
	pending = await recoverPendingSupervisionArtifacts(params, pending);
	params.throwIfAborted();
	const sourceResponse = await params.lifecycleTiming.measure("supervision-source-read", () => params.client.request("thread/read", {
		threadId: pending.sourceThreadId,
		includeTurns: true
	}, requestOptions));
	params.throwIfAborted();
	const sourceThread = sourceResponse.thread;
	if (sourceThread.id !== pending.sourceThreadId) throw new Error(`Codex supervision source read returned ${sourceThread.id} for ${pending.sourceThreadId}`);
	if (!pending.lastTurnId && (sourceThread.status?.type === "active" || (sourceThread.turns?.length ?? 0) > 0)) throw new Error("Codex source changed after Continue; reopen the source session before sending a message");
	const history = projectBoundedCodexThreadHistory({
		thread: sourceThread,
		throughTurnId: pending.lastTurnId ?? null,
		importedAt: Date.now(),
		modelProvider: sourceThread.modelProvider
	});
	let bindingCommitted = false;
	let provisionalCleanupSafe = true;
	let cleanupExpected = pending;
	const trackPendingSupervisionArtifacts = async (cleanupThreadIds) => {
		const expected = pending;
		pending = withPendingSupervisionCleanup(pending, cleanupThreadIds);
		let updated;
		try {
			updated = await params.bindingStore.mutate(params.bindingIdentity, {
				kind: "patch-pending-supervision-branch",
				expected,
				pending
			});
		} catch (error) {
			try {
				const current = params.bindingStore.read(params.bindingIdentity);
				if (matchesPendingSupervisionState(current, pending)) cleanupExpected = pending;
				else if (matchesPendingSupervisionState(current, expected)) cleanupExpected = expected;
				else throw new CodexThreadBindingConflictError(pending.sourceThreadId, "verifying supervised Codex cleanup tracking");
			} catch (verificationError) {
				provisionalCleanupSafe = false;
				throw new CodexAppServerUnsafeSubscriptionError(`Codex supervised branch cleanup tracking could not be verified: ${cleanupThreadIds.join(", ")}`, { cause: new AggregateError([error, verificationError], void 0, { cause: error }) });
			}
			throw error;
		}
		cleanupExpected = updated ? pending : void 0;
		if (!updated) throw new CodexThreadBindingConflictError(pending.sourceThreadId, "tracking supervised Codex branch cleanup");
	};
	try {
		const probeParams = buildPendingSupervisionProbeForkParams(params, pending);
		const rawProbeResponse = await requestCreatedThread("probe", () => params.client.request("thread/fork", probeParams, requestOptions));
		const probeThreadId = requireDistinctSupervisionThreadId({
			threadId: readSupervisionResponseThreadId(rawProbeResponse),
			sourceThreadId: pending.sourceThreadId,
			role: "model test"
		});
		let probeResponse;
		try {
			params.throwIfAborted();
			probeResponse = assertCodexThreadForkResponse(rawProbeResponse);
			if (params.restrictedToolSurface) await attestRestrictedToolSurface(probeThreadId, probeParams.config);
		} finally {
			await unsubscribeCodexAppServerLiveThread(params.client, probeThreadId, CODEX_APP_SERVER_UNSUBSCRIBE_TIMEOUT_MS).catch((cause) => {
				throw new CodexAppServerUnsafeSubscriptionError(`Codex model test subscription could not be released: ${probeThreadId}`, { cause });
			});
		}
		params.throwIfAborted();
		const nativeModel = requireNonBlankSupervisionValue(probeResponse.model, "native model");
		const nativeModelProvider = requireNonBlankSupervisionValue(probeResponse.modelProvider, "native model provider");
		const threadProvider = probeResponse.thread.modelProvider?.trim();
		if (threadProvider && threadProvider !== nativeModelProvider) throw new Error(`Codex supervision model provider mismatch: ${nativeModelProvider} != ${threadProvider}`);
		const nativeAttempt = {
			...params.attempt,
			modelId: nativeModel
		};
		const startParams = buildThreadStartParams(nativeAttempt, {
			...params,
			model: nativeModel,
			modelProvider: nativeModelProvider
		});
		assertExactSupervisionModelSelection(startParams, {
			model: nativeModel,
			modelProvider: nativeModelProvider,
			operation: "thread/start request"
		});
		const rawStartResponse = await requestCreatedThread("canonical", () => params.client.request("thread/start", startParams, requestOptions));
		const finalThreadId = requireDistinctSupervisionThreadId({
			threadId: readSupervisionResponseThreadId(rawStartResponse),
			sourceThreadId: pending.sourceThreadId,
			otherThreadId: probeThreadId,
			role: "canonical branch"
		});
		await trackPendingSupervisionArtifacts([finalThreadId]);
		params.throwIfAborted();
		const startResponse = assertCodexThreadStartResponse(rawStartResponse);
		assertExactSupervisionModelSelection(startResponse, {
			model: nativeModel,
			modelProvider: nativeModelProvider,
			operation: "thread/start response"
		});
		if (params.restrictedToolSurface) await attestRestrictedToolSurface(finalThreadId, startParams.config);
		if (params.provisionalAppIds?.length) try {
			await params.lifecycleTiming.measure("plugin-app-attestation", () => checkCodexThreadAppAvailability({
				client: params.client,
				threadId: finalThreadId,
				appIds: params.provisionalAppIds ?? [],
				signal: params.signal
			}));
		} catch (error) {
			if (!await discardUnattestedCodexPluginThread({
				client: params.client,
				threadId: finalThreadId,
				ephemeral: startParams.ephemeral === true
			})) {
				provisionalCleanupSafe = false;
				throw new CodexAppServerUnsafeSubscriptionError("Codex supervised plugin app attestation cleanup failed", { cause: error });
			}
			await trackPendingSupervisionArtifacts([]);
			throw error;
		}
		if (history.responseItems.length > 0) {
			await params.lifecycleTiming.measure("supervision-history-inject", () => params.client.request("thread/inject_items", {
				threadId: finalThreadId,
				items: history.responseItems
			}, requestOptions));
			params.throwIfAborted();
		}
		const historyCoveredThrough = (/* @__PURE__ */ new Date()).toISOString();
		const bindingModelProvider = params.normalizeBindingModelProvider(params.attempt.authProfileId, nativeModelProvider);
		let committed = false;
		try {
			committed = await params.bindingStore.mutate(params.bindingIdentity, {
				kind: "commit-pending-supervision-branch",
				expected: pending,
				threadId: finalThreadId,
				patch: {
					...params.bindingPatch,
					model: nativeModel,
					modelProvider: bindingModelProvider,
					historyCoveredThrough
				}
			}, params.throwIfAborted, params.authority);
		} catch (error) {
			let current;
			try {
				current = params.bindingStore.read(params.bindingIdentity);
			} catch (readError) {
				provisionalCleanupSafe = false;
				throw new CodexAppServerUnsafeSubscriptionError(`Canonical Codex branch binding could not be verified: ${finalThreadId}`, { cause: new AggregateError([error, readError]) });
			}
			if (current?.threadId === finalThreadId && current.connectionScope === "supervision" && current.supervisionSourceThreadId === pending.sourceThreadId && current.appServerRuntimeFingerprint === connectionFingerprint && current.pendingSupervisionBranch === void 0 && current.model === nativeModel && current.modelProvider === bindingModelProvider && current.historyCoveredThrough === historyCoveredThrough) committed = true;
			else {
				if (!matchesPendingSupervisionState(current, pending)) {
					provisionalCleanupSafe = false;
					throw new CodexAppServerUnsafeSubscriptionError(`Canonical Codex branch binding changed while commit was uncertain: ${finalThreadId}`, { cause: error });
				}
				throw error;
			}
		}
		if (!committed) throw new CodexThreadBindingConflictError(pending.sourceThreadId, "committing a supervised Codex branch");
		bindingCommitted = true;
		params.lifecycleTiming.mark("thread-ready");
		params.lifecycleTiming.logSummary({
			runId: params.attempt.runId,
			sessionId: params.attempt.sessionId,
			sessionKey: params.attempt.sessionKey,
			threadId: finalThreadId,
			action: "forked"
		});
		return {
			...params.binding,
			...params.bindingPatch,
			threadId: finalThreadId,
			pendingSupervisionBranch: void 0,
			model: nativeModel,
			modelProvider: bindingModelProvider,
			historyCoveredThrough,
			lifecycle: { action: "forked" }
		};
	} catch (error) {
		if (bindingCommitted) throw error;
		if (!provisionalCleanupSafe) {
			await params.abandonClient();
			throw error;
		}
		const remaining = await cleanPendingSupervisionArtifacts(params.client, pending);
		const nextPending = withPendingSupervisionCleanup(pending, remaining);
		let cleanupStateError;
		if (cleanupExpected && !isDeepStrictEqual(cleanupExpected, nextPending)) try {
			await params.bindingStore.mutate(params.bindingIdentity, {
				kind: "patch-pending-supervision-branch",
				expected: cleanupExpected,
				pending: nextPending
			});
		} catch (stateError) {
			cleanupStateError = stateError;
		}
		const unsafeCleanup = remaining.length > 0 || error instanceof CodexAppServerUnsafeSubscriptionError;
		if (unsafeCleanup) await params.abandonClient();
		if (cleanupStateError) {
			const cause = new AggregateError([error, cleanupStateError], "Codex supervised branch cleanup state could not be recorded", { cause: error });
			if (unsafeCleanup) throw new CodexAppServerUnsafeSubscriptionError("Codex supervised branch cleanup state could not be recorded", { cause });
			throw cause;
		}
		if (remaining.length > 0) throw new CodexAppServerUnsafeSubscriptionError(`Codex supervised branch cleanup remains pending: ${remaining.join(", ")}`, { cause: error });
		throw error;
	}
}
function buildPendingSupervisionProbeForkParams(params, pending) {
	const runtimeConfig = buildCodexRuntimeThreadConfigForRun(params.attempt, params.config, params);
	return {
		threadId: pending.sourceThreadId,
		...pending.lastTurnId ? { lastTurnId: pending.lastTurnId } : {},
		cwd: params.cwd,
		approvalPolicy: params.appServer.approvalPolicy,
		approvalsReviewer: resolveCodexThreadApprovalsReviewer(params.appServer, runtimeConfig),
		...codexThreadSandboxOrPermissions(params.appServer),
		...params.appServer.serviceTier !== void 0 ? { serviceTier: params.appServer.serviceTier } : {},
		config: runtimeConfig,
		developerInstructions: params.developerInstructions ?? buildDeveloperInstructions(params.attempt, {
			dynamicTools: params.dynamicTools,
			nativeCodeModeOnlyEnabled: runtimeConfig["features.code_mode_only"] === true
		}),
		ephemeral: true,
		threadSource: "appServer",
		excludeTurns: true
	};
}
function requireNonBlankSupervisionValue(value, label) {
	if (typeof value !== "string" || !value.trim()) throw new Error(`Codex supervision ${label} is missing`);
	return value.trim();
}
function matchesPendingSupervisionState(binding, expected) {
	return binding?.connectionScope === "supervision" && binding.supervisionSourceThreadId === expected.sourceThreadId && matchesPendingSupervisionBranch(binding, expected);
}
function requireDistinctSupervisionThreadId(params) {
	let threadId;
	try {
		threadId = requireNonBlankSupervisionValue(params.threadId, `${params.role} thread id`);
	} catch (error) {
		throw new CodexAppServerUnsafeSubscriptionError(`Codex supervision ${params.role} may have materialized without a safe thread id`, { cause: error });
	}
	if (threadId === params.sourceThreadId || threadId === params.otherThreadId) throw new CodexAppServerUnsafeSubscriptionError(`Codex supervision ${params.role} reused an existing thread: ${threadId}`);
	return threadId;
}
async function recoverPendingSupervisionArtifacts(params, pending) {
	if (!pending.cleanupThreadIds?.length) return pending;
	const remaining = await cleanPendingSupervisionArtifacts(params.client, pending);
	const next = withPendingSupervisionCleanup(pending, remaining);
	const incomplete = remaining.length > 0;
	if (!incomplete || remaining.length !== pending.cleanupThreadIds.length) {
		if (!await params.bindingStore.mutate(params.bindingIdentity, {
			kind: "patch-pending-supervision-branch",
			expected: pending,
			pending: next
		})) throw new CodexThreadBindingConflictError(pending.sourceThreadId, incomplete ? "recording supervised Codex cleanup recovery" : "recovering a supervised Codex branch");
	}
	if (incomplete) throw new Error(`Codex supervised branch cleanup must finish before retry: ${remaining.join(", ")}`);
	return next;
}
//#endregion
//#region extensions/codex/src/app-server/thread-lifecycle-run.ts
async function startOrResumeThread(input) {
	const incognito = isIncognitoSessionKey(input.params.sessionKey);
	const clientId = resolveCodexAppServerClientInstanceId(input.client);
	let cleanupWarmBinding;
	const prep = withCodexThreadLifecycleBinding(input, async (bindingIdentity, saved, authority) => {
		const assert = authority.assertCurrent;
		const params = {
			...input,
			assertCurrent: assert,
			authority
		};
		const expectedOwnership = params.params.expectedSessionRuntimeOwnership;
		let binding = saved;
		let selectionBinding = binding;
		if (hasCodexNativeToolCatalog(binding)) {
			const nativeCatalog = await loadCodexNativeToolCatalog({
				client: params.client,
				binding,
				appServer: params.appServer,
				agentDir: resolveCodexThreadAgentDir(params),
				authority,
				assertCurrent: () => {
					params.signal?.throwIfAborted();
					assert();
				}
			});
			if (!isDeepStrictEqual(params.dynamicTools, nativeCatalog)) throw new Error("Canonical Codex declarations changed after tool preparation; retry the turn on its preserved native thread.");
		}
		const preflight = await prepareCodexThreadLifecyclePreflight(params);
		const callerConfig = params.config;
		const { contextEngineBinding, dynamicToolsContainDeferred, dynamicToolsFingerprint, hostSystemAgentActive, legacyDynamicToolsFingerprint, legacyUserMcpServersFingerprint, lifecycleTiming, nativeSkillIsolationFingerprint, networkProxyConfigFingerprint, ringZeroActive, ringZeroClientInstanceId, ringZeroConfigFingerprint, restrictedToolSurface, restrictedToolSurfaceInheritedMcpServerNames, userMcpServersFingerprint, webSearchThreadConfigFingerprint } = preflight;
		let retainBackgroundPredecessor = false;
		let replacementPredecessor;
		const initialBoundThreadId = binding?.threadId;
		const initialBoundClientId = binding?.clientId;
		const throwIfAborted = () => throwIfCodexThreadLifecycleAborted(params.signal);
		const prepareRequestContext = async () => {
			const context = await prepareCodexThreadRequestContext(params, {
				binding,
				selectionBinding,
				bindingIdentity,
				clientId,
				config: callerConfig,
				preflight,
				assertCurrent: assert,
				throwIfAborted
			});
			params.refreshableInstructions = params.inferenceRoute ? void 0 : input.refreshableInstructions;
			return context;
		};
		const releaseRetainedThread = (threadId, ownerClientId = initialBoundClientId, assertCurrent) => releaseCodexBoundLiveThread({
			client: params.client,
			clientId,
			ownerClientId,
			abandonClient: params.abandonClient,
			lifecycleTiming,
			threadId,
			assertCurrent,
			withCurrent: authority.withCurrent,
			signal: params.signal
		});
		if (binding?.pendingSupervisionBranch) {
			const requestContext = await prepareRequestContext();
			await releaseRetainedThread(binding.threadId);
			const pendingBinding = binding;
			const pluginThreadConfig = params.pluginThreadConfig?.enabled ? await lifecycleTiming.measure("plugin-config-build", () => params.pluginThreadConfig?.build()) : void 0;
			const finalConfigPatch = await prepareCodexThreadFinalConfigPatch(params, requestContext.nativeModelInputTools);
			const config = lifecycleTiming.measureSync("merge-thread-config", () => buildCodexThreadRequestConfig(params, preflight, pluginThreadConfig?.configPatch, finalConfigPatch.configPatch));
			return publishCodexThreadInferenceBinding(params, await materializePendingSupervisionBranch({
				...params,
				abandonClient: params.abandonClient ?? (() => closeCodexStartupClientBestEffort(params.client)),
				bindingIdentity,
				authority,
				binding: pendingBinding,
				attempt: params.params,
				config,
				hostSystemAgentActive,
				restrictedToolSurface,
				restrictedToolSurfaceInheritedMcpServerNames,
				provisionalAppIds: pluginThreadConfig?.provisionalAppIds,
				throwIfAborted: () => {
					params.assertCurrent?.();
					requestContext.assertInferenceConfig(config);
				},
				lifecycleTiming,
				normalizeBindingModelProvider: requestContext.normalizeBindingModelProvider,
				bindingPatch: {
					cwd: params.cwd,
					...clientId ? { clientId } : {},
					authProfileId: void 0,
					agentWorkspaceDeveloperInstructions: params.agentWorkspaceDeveloperInstructions,
					preserveNativeModel: true,
					...buildCodexThreadBindingPolicy(params, preflight),
					webSearchThreadConfigFingerprint,
					mcpServersFingerprint: params.mcpServersFingerprintEvaluated === true ? params.mcpServersFingerprint : pendingBinding.mcpServersFingerprint,
					nativeHookRelayGeneration: finalConfigPatch.nativeHookRelayGeneration,
					appServerRuntimeFingerprint: buildCodexAppServerConnectionFingerprint(params.appServer, params.params.agentDir),
					pluginAppsFingerprint: pluginThreadConfig?.fingerprint,
					pluginAppsInputFingerprint: pluginThreadConfig?.inputFingerprint,
					pluginAppPolicyContext: pluginThreadConfig?.policyContext,
					conversationSourceTransferComplete: true
				}
			}));
		}
		const stageBindingReplacement = (operation) => {
			const current = binding;
			if (!current?.threadId) return;
			assertCodexBindingMayBeReplaced(current, operation, expectedOwnership);
			assert();
			replacementPredecessor = current;
			binding = void 0;
		};
		const rotateStaleBinding = (current, changed, details) => {
			log.debug(`codex app-server ${changed} changed; starting a new thread`, {
				threadId: current.threadId,
				...details
			});
			stageBindingReplacement("rotating a stale thread binding");
		};
		const transientDelegationRestriction = params.params.delegationCapability === "report_only";
		const persistentWebSearchRestriction = params.webSearchAllowed === false && params.persistentWebSearchAllowed === false;
		const transientNativeToolRestriction = params.nativeCodeModeEnabled === false && !persistentWebSearchRestriction;
		const transientWebSearchRestriction = isTransientWebSearchRestriction(params);
		if (binding?.pendingResumeConfiguration) return publishCodexThreadInferenceBinding(params, await resumePendingCodexThread(params, {
			...await prepareRequestContext(),
			binding,
			stageBindingReplacement,
			releaseRetainedThread: (threadId, assertCurrent) => releaseRetainedThread(threadId, initialBoundClientId, assertCurrent),
			transientRestriction: transientDelegationRestriction || transientNativeToolRestriction || transientWebSearchRestriction
		}));
		if (binding?.threadId) {
			if (!restrictedToolSurface && binding.nativeToolPolicyRestricted === true) stageBindingReplacement("rotating a host-policy-restricted thread binding");
			else if (binding.nativeSkillIsolationFingerprint !== nativeSkillIsolationFingerprint) {
				log.debug("codex app-server native skill isolation changed; starting a new thread", { threadId: binding.threadId });
				stageBindingReplacement("rotating stale native skill isolation");
			} else if ((binding.ringZeroConfigFingerprint !== ringZeroConfigFingerprint || binding.ringZeroClientInstanceId !== ringZeroClientInstanceId) && (ringZeroActive || binding.ringZeroConfigFingerprint !== void 0)) {
				log.debug("codex app-server ring-zero restriction changed; rotating thread", { threadId: binding.threadId });
				stageBindingReplacement("rotating a ring-zero thread binding");
			} else if (shouldRotateCodexAppServerBindingForRuntime({
				connectionClass: params.appServer.connectionClass,
				current: binding.connectionScope === "supervision" ? buildCodexAppServerConnectionFingerprint(params.appServer, params.params.agentDir) : params.appServerRuntimeFingerprint,
				binding: binding.appServerRuntimeFingerprint
			})) rotateStaleBinding(binding, "runtime identity", { connectionClass: params.appServer.connectionClass });
			else if (shouldRotateCodexGpt56MultiAgentBinding({
				bindingModel: binding.model,
				requestedModel: params.params.modelId
			})) {
				log.debug("codex app-server GPT-5.6 multi-agent version changed; starting a new thread", {
					threadId: binding.threadId,
					bindingModel: binding.model,
					requestedModel: params.params.modelId
				});
				stageBindingReplacement("rotating a GPT-5.6 multi-agent thread binding");
			}
		}
		selectionBinding = binding;
		let preserveExistingBinding = transientDelegationRestriction || !ringZeroActive && params.nativeProviderWebSearchSupport === "unknown" && !binding?.threadId;
		let rotatedContextEngineBinding = false;
		let prebuiltPluginThreadConfig;
		const buildLoadedPluginThreadConfig = async (current) => {
			if (!params.pluginThreadConfig?.requiresCurrentPolicyCheck && !shouldRecheckRecoverablePluginBinding({
				binding: current,
				pluginThreadConfig: params.pluginThreadConfig
			})) return;
			try {
				prebuiltPluginThreadConfig = await lifecycleTiming.measure("plugin-config-recovery", () => params.pluginThreadConfig?.build({ threadId: current.threadId }));
			} catch (error) {
				throwIfAborted();
				if (params.pluginThreadConfig?.requiresCurrentPolicyCheck) throw error;
				log.warn("codex app-server plugin app config recovery check failed", {
					error,
					threadId: current.threadId
				});
				return;
			}
			throwIfAborted();
			return prebuiltPluginThreadConfig;
		};
		const webSearchBindingChanged = binding?.threadId && binding.webSearchThreadConfigFingerprint !== webSearchThreadConfigFingerprint;
		const explicitTransientWebSearchRestriction = params.webSearchAllowed === false && params.persistentWebSearchAllowed !== false && transientWebSearchRestriction;
		const unknownProviderWebSearchSupport = params.nativeProviderWebSearchSupport === "unknown";
		const configuredMcpOwnershipChanged = binding?.threadId && (params.configuredMcpOwnershipVersion === 1 && (binding.configuredMcpOwnershipVersion !== 1 || binding.dynamicToolsFingerprint === void 0 || binding.mcpServersFingerprint !== void 0 || binding.userMcpServersFingerprint !== void 0) || params.configuredMcpOwnershipVersion !== 1 && binding.configuredMcpOwnershipVersion === 1);
		if (configuredMcpOwnershipChanged && binding?.threadId) {
			const predecessorBinding = binding;
			stageBindingReplacement("changing configured MCP ownership");
			log.debug("codex app-server configured MCP ownership changed; starting a new thread", { threadId: predecessorBinding.threadId });
			preserveExistingBinding = false;
		}
		if (binding?.threadId && params.mcpServersFingerprintEvaluated === true && binding.mcpServersFingerprint !== params.mcpServersFingerprint) {
			assertCodexBindingMayBeReplaced(binding, "changing MCP configuration", expectedOwnership);
			if (!ringZeroActive && (transientNativeToolRestriction || webSearchBindingChanged && (explicitTransientWebSearchRestriction || unknownProviderWebSearchSupport))) {
				log.debug("codex app-server MCP config changed during transient restricted turn; starting transient thread", { threadId: binding.threadId });
				preserveExistingBinding = true;
			} else rotateStaleBinding(binding, "MCP config");
			binding = void 0;
		}
		const deferLegacyWebSearchRotationToTransientNativeSurface = params.nativeCodeModeEnabled === false && binding?.webSearchThreadConfigFingerprint === void 0 && !persistentWebSearchRestriction;
		if (binding?.threadId && webSearchBindingChanged && !deferLegacyWebSearchRotationToTransientNativeSurface) {
			assertCodexBindingMayBeReplaced(binding, "changing web-search configuration", expectedOwnership);
			if (!ringZeroActive && transientWebSearchRestriction) {
				log.debug("codex app-server tool surface restricted for turn; starting transient thread", { threadId: binding.threadId });
				preserveExistingBinding = true;
			} else rotateStaleBinding(binding, "web search config");
			binding = void 0;
		}
		if (binding?.threadId && transientNativeToolRestriction && !ringZeroActive) {
			assertCodexBindingMayBeReplaced(binding, "starting a native-tool-restricted turn", expectedOwnership);
			log.debug("codex app-server native tool surface disabled for turn; starting transient thread", { threadId: binding.threadId });
			preserveExistingBinding = true;
			binding = void 0;
		}
		if (binding?.threadId && transientDelegationRestriction) {
			assertCodexBindingMayBeReplaced(binding, "starting a delegation-restricted turn", expectedOwnership);
			log.debug("codex app-server delegation restricted for turn; starting transient thread", { threadId: binding.threadId });
			binding = void 0;
		}
		if (binding?.threadId) {
			if (!areUserMcpServersFingerprintsCompatible({
				previous: binding.userMcpServersFingerprint,
				next: userMcpServersFingerprint,
				nextLegacy: legacyUserMcpServersFingerprint
			})) rotateStaleBinding(binding, "user MCP config");
			else if (binding.networkProxyConfigFingerprint !== networkProxyConfigFingerprint || binding.networkProxyProfileName !== params.appServer.networkProxy?.profileName) rotateStaleBinding(binding, "network proxy config");
			else if (isCodexPluginThreadBindingStale({
				codexPluginsEnabled: params.pluginThreadConfig?.enabled ?? false,
				bindingFingerprint: binding.pluginAppsFingerprint,
				bindingInputFingerprint: binding.pluginAppsInputFingerprint,
				currentInputFingerprint: params.pluginThreadConfig?.inputFingerprint,
				hasBindingPolicyContext: Boolean(binding.pluginAppPolicyContext)
			})) rotateStaleBinding(binding, "plugin app config");
			else if (binding.dynamicToolsFingerprint && params.dynamicTools.length > 0 && binding.dynamicToolsContainDeferred !== dynamicToolsContainDeferred && (binding.dynamicToolsContainDeferred !== void 0 || !dynamicToolsContainDeferred)) rotateStaleBinding(binding, "dynamic tool loading");
		}
		if (binding?.threadId && (binding.contextEngine || contextEngineBinding)) {
			if (!contextEngineBinding || !isContextEngineBindingCompatible(binding.contextEngine, contextEngineBinding)) {
				retainBackgroundPredecessor = initialBoundClientId === clientId && binding.contextEngine?.engineId === contextEngineBinding?.engineId && binding.contextEngine?.policyFingerprint === contextEngineBinding?.policyFingerprint && Boolean(contextEngineBinding) && (!binding.dynamicToolsFingerprint || areCodexDynamicToolFingerprintsCompatible({
					previous: binding.dynamicToolsFingerprint,
					next: dynamicToolsFingerprint,
					nextLegacy: legacyDynamicToolsFingerprint
				})) && isCodexAppServerLiveThreadBackgroundOnly(params.client, binding.threadId);
				if (retainBackgroundPredecessor) {
					const currentPluginConfig = await buildLoadedPluginThreadConfig(binding);
					if (currentPluginConfig && currentPluginConfig.fingerprint !== binding.pluginAppsFingerprint) retainBackgroundPredecessor = false;
				}
				if (retainBackgroundPredecessor) retainBackgroundPredecessor = await canRetainCodexProjectionBackgroundWork(params, binding, await prepareRequestContext(), prebuiltPluginThreadConfig);
				rotateStaleBinding(binding, "context-engine binding", {
					engineId: contextEngineBinding?.engineId,
					previousEngineId: binding.contextEngine?.engineId,
					epoch: contextEngineBinding?.projection?.epoch,
					previousEpoch: binding.contextEngine?.projection?.epoch,
					fingerprint: contextEngineBinding?.projection?.fingerprint,
					previousFingerprint: binding.contextEngine?.projection?.fingerprint,
					policyFingerprint: contextEngineBinding?.policyFingerprint,
					previousPolicyFingerprint: binding.contextEngine?.policyFingerprint
				});
				rotatedContextEngineBinding = true;
			}
		}
		if (binding?.threadId) {
			if (binding.dynamicToolsFingerprint && !areCodexDynamicToolFingerprintsCompatible({
				previous: binding.dynamicToolsFingerprint,
				next: dynamicToolsFingerprint,
				nextLegacy: legacyDynamicToolsFingerprint
			})) {
				assertCodexBindingMayBeReplaced(binding, "changing the dynamic tool catalog", expectedOwnership);
				preserveExistingBinding = shouldStartTransientNoToolThread({
					previous: binding.dynamicToolsFingerprint,
					nextHasDynamicTools: params.dynamicTools.length > 0
				});
				if (preserveExistingBinding) log.debug("codex app-server dynamic tools unavailable for turn; starting transient thread", { threadId: binding.threadId });
				else rotateStaleBinding(binding, "dynamic tool catalog");
			} else {
				const requestContext = await prepareRequestContext();
				const warmReuse = await tryReuseCodexLiveThread({
					...requestContext,
					params,
					binding,
					clientId,
					buildLoadedPluginThreadConfig
				});
				if (warmReuse.kind === "ready") {
					cleanupWarmBinding = warmReuse.cleanupOnFailure;
					return publishCodexThreadInferenceBinding(params, warmReuse.binding, true);
				}
				if (incognito || warmReuse.kind === "rotate") {
					throwIfAborted();
					stageBindingReplacement(incognito ? "rotating an unavailable ephemeral thread binding" : "rotating a stale plugin app binding");
				} else {
					const resumeBinding = binding;
					const resumed = await resumeExistingCodexThread(params, {
						...requestContext,
						binding: resumeBinding,
						stageBindingReplacement,
						prebuiltFinalConfigPatch: warmReuse.prebuiltFinalConfigPatch,
						prebuiltPluginThreadConfig,
						buildLoadedPluginThreadConfig,
						prepareResume: () => prepareCodexThreadResume(params, resumeBinding, requestContext),
						releaseRetainedThread: async (assertCurrent) => {
							await releaseRetainedThread(resumeBinding.threadId, resumeBinding.clientId, assertCurrent);
						}
					});
					if (resumed) return publishCodexThreadInferenceBinding(params, resumed);
				}
			}
		}
		assertCodexBindingMayBeReplaced(binding, "starting a fresh native thread", expectedOwnership);
		const requestContext = await prepareRequestContext();
		if (initialBoundThreadId && !preserveExistingBinding && !configuredMcpOwnershipChanged && !(retainBackgroundPredecessor && isCodexAppServerLiveThreadBackgroundOnly(params.client, initialBoundThreadId))) await releaseRetainedThread(initialBoundThreadId);
		const started = await startFreshCodexThread(params, {
			...requestContext,
			prebuiltPluginThreadConfig,
			preserveExistingBinding,
			rotatedContextEngineBinding,
			replacementPredecessor
		});
		if (replacementPredecessor && !preserveExistingBinding && configuredMcpOwnershipChanged) await releaseRetainedThread(replacementPredecessor.threadId, replacementPredecessor.clientId);
		return publishCodexThreadInferenceBinding(params, started);
	});
	try {
		return await prep;
	} catch (error) {
		if (cleanupWarmBinding) try {
			await cleanupWarmBinding();
		} catch (releaseError) {
			throw new AggregateError([error, releaseError], "Codex warm thread preparation and subscription cleanup failed", { cause: releaseError });
		}
		throw error;
	}
}
//#endregion
export { prepareCodexPluginThreadConfigStartupProvider as a, buildLegacyScheduledCodexAppRecoveryPrompt as c, resolveScheduledCodexAppCreatorCaptureDecision as d, isContextEngineBindingCompatible as i, buildScheduledCodexAppServerConnectionIdentity as l, isCodexAppServerProfilerEnabled as n, resolveCodexPluginThreadConfigStartupPolicy as o, buildContextEngineBinding as r, assertScheduledCodexAppAuthorityRuntime as s, startOrResumeThread as t, captureScheduledCodexAppAuthority as u };
