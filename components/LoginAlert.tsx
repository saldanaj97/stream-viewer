import { Alert } from "@heroui/alert";
import { AlertColor } from "@heroui/alert/dist/alert";
import { Button } from "@heroui/button";

export default function LoginAlert({
  color,
  title,
  description,
  isVisible,
  setIsVisible,
}: {
  color: AlertColor;
  title: string;
  description: string;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {isVisible ? (
        <Alert
          color={color}
          description={description}
          isVisible={isVisible}
          title={title}
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
      ) : (
        <Button variant="bordered" onPress={() => setIsVisible(true)}>
          Show Alert
        </Button>
      )}
    </div>
  );
}
