

const colorSet = [
  { color: "red" },
  { color: "green" },
  { color: "blue" }
];

const options = [
  ['Background Color', 'colorBackground']
];

// openCheck is set to true by companion if peersocket is open. Set in sendSettingsData()
// companionCheck is set to true if the companion is responding to settings. Set on companion launch
// if companion is NOT responding, user will be able to toggle both checks between false and true
function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Connection Check</Text>}>
        <Toggle
          settingsKey="openCheck"
          label="Check for open connection"
        />
      </Section>
      <Section
        title={<Text bold align="center">Companion Check</Text>}>
        <Toggle
          settingsKey="companionCheck"
          label="Check for companion"
        />
      </Section>
      <Section
        title='Background Color'>
        <ColorSelect
          settingsKey='colorBackground'
          colors={colorSet} />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);



