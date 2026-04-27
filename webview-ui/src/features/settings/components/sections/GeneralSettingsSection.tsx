import { VSCodeCheckbox, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { useSettingsStore } from "@/features/settings/store/settingsStore"
import PreferredLanguageSetting from "../PreferredLanguageSetting"
import Section from "../Section"
import { updateSetting } from "../utils/settingsHandlers"

interface GeneralSettingsSectionProps {
	renderSectionHeader: (tabId: string) => JSX.Element | null
}

const GeneralSettingsSection = ({ renderSectionHeader }: GeneralSettingsSectionProps) => {
	const { writePromptMetadataEnabled, writePromptMetadataDirectory } = useSettingsStore()

	return (
		<div>
			{renderSectionHeader("general")}
			<Section>
				<PreferredLanguageSetting />

				<div className="mb-4 mt-8">
					<div className="flex items-center mb-2">
						<VSCodeCheckbox
							checked={writePromptMetadataEnabled ?? false}
							onClick={(e: any) => updateSetting("writePromptMetadataEnabled", e.target.checked === true)}>
							Write prompt metadata artifacts
						</VSCodeCheckbox>
					</div>
					<p className="text-sm text-description mb-4">
						When enabled, Dirac will save the system prompt, tools, and conversation history to a markdown file for
						each request. This is useful for debugging and inspecting the exact prompts being sent to the AI.
					</p>

					{writePromptMetadataEnabled && (
						<div className="ml-6">
							<div className="mb-2">
								<label className="font-medium block mb-1">Artifacts Directory</label>
								<VSCodeTextField
									className="w-full"
									onChange={(e: any) => updateSetting("writePromptMetadataDirectory", e.target.value)}
									placeholder="e.g. .dirac-prompt-artifacts (defaults to workspace root if empty)"
									value={writePromptMetadataDirectory || ""}
								/>
							</div>
							<p className="text-xs text-description">
								Specify the directory where debug artifacts should be saved. Relative paths are resolved against
								your workspace root.
							</p>
						</div>
					)}
				</div>
			</Section>
		</div>
	)
}

export default GeneralSettingsSection
