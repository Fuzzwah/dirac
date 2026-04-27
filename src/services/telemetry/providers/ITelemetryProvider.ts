export type TelemetryProperties = Record<string, unknown>
export type TelemetryObject = TelemetryProperties

export interface TelemetrySettings {
	hostEnabled: boolean
	level: "off" | "error" | "all"
}

export interface ITelemetryProvider {
	readonly name: string
	initialize(): Promise<ITelemetryProvider>
	log(event: string, properties?: TelemetryProperties): void
	logRequired(event: string, properties?: TelemetryProperties): void
	identifyUser(userInfo: unknown, properties?: TelemetryProperties): void
	isEnabled(): boolean
	getSettings(): TelemetrySettings
	recordCounter(name: string, value: number, attributes?: TelemetryProperties, description?: string, required?: boolean): void
	recordHistogram(name: string, value: number, attributes?: TelemetryProperties, description?: string, required?: boolean): void
	recordGauge(name: string, value: number | null, attributes?: TelemetryProperties, description?: string, required?: boolean): void
	forceFlush(): Promise<void>
	dispose(): Promise<void>
}
