import { noOpTelemetryService } from "./TelemetryService"

export type { ITelemetryProvider, TelemetryProperties, TelemetrySettings } from "./providers/ITelemetryProvider"
export type {
	StandaloneOutputMethod,
	TelemetryMetadata,
	TerminalOutputMethod,
	TerminalType,
	TokenUsage,
	VscodeOutputMethod,
} from "./TelemetryService"
export {
	TerminalHangStage,
	TerminalOutputFailureReason,
	TerminalUserInterventionAction,
	TelemetryService,
	noOpTelemetryService as telemetryService,
} from "./TelemetryService"

export async function getTelemetryService(): Promise<any> {
	return noOpTelemetryService
}

export function resetTelemetryService(): void {}
