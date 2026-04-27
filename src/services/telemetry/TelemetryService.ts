import type { ITelemetryProvider, TelemetryProperties } from "./providers/ITelemetryProvider"

export type TerminalType = "vscode" | "standalone"
export type VscodeOutputMethod = "shell_integration" | "clipboard" | "none"
export type StandaloneOutputMethod = "child_process" | "child_process_error"
export type TerminalOutputMethod = VscodeOutputMethod | StandaloneOutputMethod

export enum TerminalOutputFailureReason {
	TIMEOUT = "timeout",
	NO_SHELL_INTEGRATION = "no_shell_integration",
	CLIPBOARD_FAILED = "clipboard_failed",
}

export enum TerminalUserInterventionAction {
	PROCESS_WHILE_RUNNING = "process_while_running",
	MANUAL_PASTE = "manual_paste",
	CANCELLED = "cancelled",
}

export enum TerminalHangStage {
	WAITING_FOR_COMPLETION = "waiting_for_completion",
	BUFFER_STUCK = "buffer_stuck",
	STREAM_TIMEOUT = "stream_timeout",
}

export type TelemetryMetadata = {
	extension_version: string
	dirac_type: string
	platform: string
	platform_version: string
	os_type: string
	os_version: string
	is_dev: string | undefined
}

export interface TokenUsage {
	tokensIn?: number
	tokensOut?: number
	cacheWriteTokens?: number
	cacheReadTokens?: number
	totalCost?: number
}

const NO_OP_PROVIDER: ITelemetryProvider = {
	name: "NoOpTelemetryProvider",
	initialize: async () => NO_OP_PROVIDER,
	log: () => {},
	logRequired: () => {},
	identifyUser: () => {},
	isEnabled: () => false,
	getSettings: () => ({ hostEnabled: false, level: "off" }),
	recordCounter: () => {},
	recordHistogram: () => {},
	recordGauge: () => {},
	forceFlush: async () => {},
	dispose: async () => {},
}

function createNoOpCallable(): any {
	return () => undefined
}

function createNoOpProxy(): any {
	return new Proxy(createNoOpCallable(), {
		get(_target, prop) {
			if (prop === "getProviders") {
				return async () => [] as ITelemetryProvider[]
			}
			if (prop === "isCategoryEnabled") {
				return () => false
			}
			if (prop === "getSettings") {
				return () => NO_OP_PROVIDER.getSettings()
			}
			if (prop === "provider" || prop === "providers") {
				return []
			}
			if (prop === "then") {
				return undefined
			}
			return createNoOpCallable()
		},
		apply() {
			return undefined
		},
	})
}

export class TelemetryService {
	public static async create(): Promise<TelemetryService> {
		return new TelemetryService()
	}

	public async getProviders(): Promise<ITelemetryProvider[]> {
		return []
	}

	public isEnabled(): boolean {
		return false
	}

	public isCategoryEnabled(_category: string): boolean {
		return false
	}

	public capture(_event: unknown, _properties?: TelemetryProperties): void {}
	public captureRequired(_event: unknown, _properties?: TelemetryProperties): void {}
	public safeCapture(_event: unknown, _properties?: TelemetryProperties): void {}
	public async dispose(): Promise<void> {}
}

export const noOpTelemetryService = createNoOpProxy()
