import {
  Avatar,
  Badge,
  BadgeOwnProps,
  Button,
  Combobox,
  Dialog,
  Pane,
  Pulsar,
  RadioGroup,
  Spinner,
  StatusIndicator,
  Text,
  Textarea,
  Tooltip,
} from "evergreen-ui";
import { ChangeEvent, useState } from "react";

interface FruitMapperProps {
  [key: string]: string;
}

const FruitMapper: FruitMapperProps = {
  Banana: "🍌",
  Orange: "🍊",
  Apple: "🍎",
  Mango: "🥭",
};

export default function UserCard() {
  const [isShown, setIsShown] = useState(false);
  const [exampleText, setExampleText] = useState<string>("");
  const [options] = useState([
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ]);

  const [colorValue, setColorValue] = useState("green");
  return (
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
  );
}
