import { useState } from "react";
import {
  Alert,
  Button,
  FilePicker,
  Label,
  Pane,
  Paragraph,
  Position,
  SearchInput,
  SideSheet,
  Switch,
  Tab,
  Tablist,
  Text,
  majorScale,
} from "evergreen-ui";
import CustomFileUploader from "./components/FileUploader";
import UserCard from "./components/UserCard";

export default function App() {
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [switchChecked, setSwitchChecked] = useState(true);

  return (
    <>
      <Pane className="rounded-xl shadow-md w-fit p-4 mx-4 mt-4">
        <Text fontWeight="900">Basic Evergreen UI Components Usage</Text>
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
          <Tab
            aria-controls={`panel-${2}`}
            isSelected={selectedIndex === 2}
            key={2}
            onSelect={() => setSelectedIndex(2)}
          >
            Side Sheet
          </Tab>
          <Tab
            aria-controls={`panel-${3}`}
            isSelected={selectedIndex === 3}
            key={3}
            onSelect={() => setSelectedIndex(3)}
          >
            Custom User Card Component
          </Tab>
          <Tab
            aria-controls={`panel-${4}`}
            isSelected={selectedIndex === 4}
            key={4}
            onSelect={() => setSelectedIndex(4)}
          >
            Basic Alert Components
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
          <Pane
            aria-labelledby={"2"}
            aria-hidden={2 !== selectedIndex}
            display={2 === selectedIndex ? "block" : "none"}
            key={2}
            role="tabpanel"
          >
            <SideSheet
              position={Position.BOTTOM}
              isShown={sideSheetOpen}
              onCloseComplete={() => setSideSheetOpen(false)}
            >
              <Paragraph margin={40} fontWeight="900">
                SideSheet Component
              </Paragraph>
            </SideSheet>
            <Button onClick={() => setSideSheetOpen(true)}>
              Show Side Sheet
            </Button>
          </Pane>
          <Pane
            aria-labelledby={"3"}
            aria-hidden={3 !== selectedIndex}
            display={3 === selectedIndex ? "block" : "none"}
            key={3}
            role="tabpanel"
          >
            <Pane className="px-4 py-8">
              <Text fontWeight="900" fontSize="70">
                Custom User Card Component
              </Text>
            </Pane>
            <UserCard />
          </Pane>
          <Pane
            aria-labelledby={"4"}
            aria-hidden={4 !== selectedIndex}
            display={4 === selectedIndex ? "block" : "none"}
            key={4}
            role="tabpanel"
          >
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
              {["none", "success", "warning", "danger"].map(
                (alertType, index) => {
                  return (
                    <Alert
                      key={`${alertType}_${index}`}
                      intent={alertType}
                      title="This is an Alert component"
                      marginBottom={32}
                    />
                  );
                }
              )}
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </>
  );
}
