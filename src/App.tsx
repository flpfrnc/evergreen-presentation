import { ChangeEvent, useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  BadgeOwnProps,
  Button,
  Combobox,
  Dialog,
  FilePicker,
  Label,
  Pane,
  Pulsar,
  RadioGroup,
  SearchInput,
  Spinner,
  StatusIndicator,
  Switch,
  Tab,
  Tablist,
  Text,
  Textarea,
  Tooltip,
  majorScale,
} from "evergreen-ui";
import CustomFileUploader from "./components/FileUploader";

interface FruitMapperProps {
  [key: string]: string;
}

const FruitMapper: FruitMapperProps = {
  Banana: "🍌",
  Orange: "🍊",
  Apple: "🍎",
  Mango: "🥭",
};

function App() {
  const [isShown, setIsShown] = useState(false);
  const [exampleText, setExampleText] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [switchChecked, setSwitchChecked] = useState(true);

  const [options] = useState([
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ]);

  const [colorValue, setColorValue] = useState("green");

  return (
    <>
      <Pane className="rounded-xl shadow-md w-fit p-4 mx-4 my-4">
        <Pane className="px-4 py-4">
          <Text fontWeight="900" fontSize="70">
            Basic Alert Components
          </Text>
        </Pane>
        <Pane
          display="flex"
          alignItems="center"
          gap="16px"
          marginX={majorScale(2)}
          className="py-8"
        >
          {["none", "success", "warning", "danger"].map((alertType, index) => {
            return (
              <Alert
                key={`${alertType}_${index}`}
                intent={alertType}
                title="This is an Alert component"
                marginBottom={32}
              />
            );
          })}
        </Pane>

        <Pane className="px-4 py-8">
          <Text fontWeight="900" fontSize="70">
            Custom User Card Component
          </Text>
        </Pane>
        <Pane className="rounded-xl shadow-md w-fit p-4 mx-4">
          {/* 
        The bellow pane properties are equivalent to the following
        tailwind classes: "flex flex-col items-center gap-4" 
        */}
          <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="16px"
          >
            {/* Custom profile card using evergreen components */}
            <Pane className="flex items-center gap-4">
              <Pane position="relative" display="flex">
                <StatusIndicator color="success" />
                <Avatar
                  name="Avatar Component"
                  size={40}
                  title="Avatar Component"
                />
                <Tooltip content="This a Pulsar component">
                  <Pulsar />
                </Tooltip>
              </Pane>

              <Badge
                color={colorValue as BadgeOwnProps["color"]}
                marginRight={8}
                size="small"
              >
                Badge Component
              </Badge>
            </Pane>
            <Text fontWeight="600">Text Component</Text>

            <Text fontWeight="300">
              {!isShown ? exampleText : <Spinner size={24} />}
            </Text>

            <Tooltip content="These are Button Components">
              <Pane>
                <Button marginRight={16} appearance="minimal">
                  Minimal Button Appearance
                </Button>
                <Button
                  marginRight={16}
                  appearance="primary"
                  onClick={() => setIsShown(true)}
                >
                  Edit Description
                </Button>
              </Pane>
            </Tooltip>
            <Dialog
              isShown={isShown}
              title="Edit card description."
              onCloseComplete={() => setIsShown(false)}
              confirmLabel="Confirmar"
            >
              <Pane>
                <Tooltip content="Textarea Component">
                  <Textarea
                    id="textarea"
                    placeholder="Type any information"
                    value={exampleText || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setExampleText(e.currentTarget.value)
                    }
                  />
                </Tooltip>
                <Combobox
                  openOnFocus
                  items={["Banana", "Orange", "Apple", "Mango"]}
                  title="Add an available emoji to the text"
                  onChange={(selected: string) =>
                    setExampleText(exampleText.concat(FruitMapper[selected]))
                  }
                  placeholder="Combobox Component"
                />
                <RadioGroup
                  label="Badge Color"
                  className="py-4"
                  value={colorValue}
                  options={options}
                  onChange={(event) => setColorValue(event.target.value)}
                />
              </Pane>
            </Dialog>
          </Pane>
        </Pane>
      </Pane>

      <Pane height={120} className="py-16 px-4">
        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
          <Tab
            aria-controls={`panel-${0}`}
            isSelected={selectedIndex === 0}
            key={0}
            onSelect={() => setSelectedIndex(0)}
          >
            Upload File Component
          </Tab>
          <Tab
            aria-controls={`panel-${1}`}
            isSelected={selectedIndex === 1}
            key={1}
            onSelect={() => setSelectedIndex(1)}
          >
            Form Components
          </Tab>
        </Tablist>
        <Pane padding={16} background="tint1" flex="1">
          <Pane
            aria-labelledby={"0"}
            aria-hidden={0 !== selectedIndex}
            display={0 === selectedIndex ? "block" : "none"}
            key={0}
            role="tabpanel"
          >
            <Pane className="px-4 py-16">
              <Text fontWeight="800" fontSize="35">
                Upload File Component
              </Text>
              <CustomFileUploader />
            </Pane>
          </Pane>
          <Pane
            aria-labelledby={"1"}
            aria-hidden={1 !== selectedIndex}
            display={1 === selectedIndex ? "block" : "none"}
            key={1}
            role="tabpanel"
          >
            <form className="flex flex-col gap-4">
              <Pane className="flex flex-col gap-4 italic">
                <Label>Search Input Component:</Label>
                <SearchInput placeholder="Search input component" />
              </Pane>
              <Pane className="flex gap-4 italic">
                <Label>Switch Component:</Label>
                <Switch
                  checked={switchChecked}
                  onChange={(e) => setSwitchChecked(e.target.checked)}
                />
              </Pane>
              <Pane className="flex flex-col gap-4 italic">
                <Label>File Picker Component:</Label>
                <FilePicker
                  multiple
                  width={250}
                  onChange={(files) => console.log(files)}
                  placeholder="Select the file here!"
                />
              </Pane>
            </form>
          </Pane>
        </Pane>
      </Pane>
    </>
  );
}

export default App;
