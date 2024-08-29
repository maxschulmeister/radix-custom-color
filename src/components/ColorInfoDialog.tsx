import { categorizeColor } from "@/lib/categorizeColor";
import * as Dialog from "@radix-ui/react-dialog";

interface ColorInfoDialogProps {
  color: {
    solidColor: string;
    alphaColor: string;
    wideGamutColor: string;
    wideGamutAlphaColor: string;
  } | null;
  isOpen: boolean;
  index: number | null;
  onClose: () => void;
}

export function ColorInfoDialog({
  color,
  isOpen,
  index,
  onClose,
}: ColorInfoDialogProps) {
  if (!color) return null;

  const { solidColor, alphaColor, wideGamutColor, wideGamutAlphaColor } = color;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70" />
        <Dialog.Content className="fixed w-full max-w-md p-4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md dark:bg-grayDark-2 top-1/2 left-1/2">
          <div className="h-32" style={{ backgroundColor: solidColor }}></div>
          <h3 className="mt-4 mb-2 text-2xl font-bold capitalize text-gray-12 dark:text-grayDark-12">
            {`${categorizeColor(color.solidColor)} ${index ? index + 1 : ""}`}
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <span className="text-gray-11 dark:text-grayDark-11">
              Solid color
            </span>
            <span className="text-gray-12 dark:text-grayDark-12">
              {solidColor}
            </span>

            <span className="text-gray-11 dark:text-grayDark-11">
              Alpha color
            </span>
            <span className="text-gray-12 dark:text-grayDark-12">
              {alphaColor}
            </span>

            <span className="text-gray-11 dark:text-grayDark-11">P3:</span>
            <span className="text-gray-12 dark:text-grayDark-12">
              {wideGamutColor}
            </span>

            <span className="text-gray-11 dark:text-grayDark-11">OKLCH:</span>
            <span className="text-gray-12 dark:text-grayDark-12">
              {wideGamutAlphaColor}
            </span>
          </div>

          <Dialog.Close asChild>
            <button className="absolute text-gray-11 dark:text-grayDark-11 top-2 right-2 hover:text-gray-12 dark:hover:text-grayDark-12">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
