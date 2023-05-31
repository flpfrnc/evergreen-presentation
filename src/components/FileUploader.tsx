import {
  Alert,
  FileRejectionReason,
  FileUploader,
  MimeType,
  Pane,
  majorScale,
  rebaseFiles,
} from "evergreen-ui";
import { useCallback, useMemo, useState } from "react";
import React from "react";
import { FileCard } from "evergreen-ui";
import { FileRejection } from "evergreen-ui/types/file-uploader/src/utils/get-file-rejections";

export default function CustomFileUploader() {
  const acceptedMimeTypes: MimeType[] = [MimeType.jpeg, MimeType.pdf];
  const maxFiles = 5;
  const maxSizeInBytes = 50 * 1024 ** 2; // 50 MB
  const [files, setFiles] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<any>([]);
  const values = useMemo(
    () => [
      ...files,
      ...fileRejections.map(
        (fileRejection: FileRejection) => fileRejection.file
      ),
    ],
    [files, fileRejections]
  );
  const handleRemove = useCallback(
    (file: File) => {
      const updatedFiles = files.filter(
        (existingFile) => existingFile !== file
      );
      const updatedFileRejections = fileRejections.filter(
        (fileRejection: FileRejection) => fileRejection.file !== file
      );

      const { accepted, rejected } = rebaseFiles(
        [
          ...updatedFiles,
          ...updatedFileRejections.map(
            (fileRejection: FileRejection) => fileRejection.file
          ),
        ],
        { acceptedMimeTypes, maxFiles, maxSizeInBytes }
      );

      setFiles(accepted);
      setFileRejections(rejected);
    },
    [acceptedMimeTypes, files, fileRejections, maxFiles, maxSizeInBytes]
  );

  const fileCountOverLimit = files.length + fileRejections.length - maxFiles;
  const fileCountError = `You can upload up to 5 files. Please remove ${fileCountOverLimit} ${
    fileCountOverLimit === 1 ? "file" : "files"
  }.`;

  return (
    <Pane maxWidth={654}>
      <FileUploader
        acceptedMimeTypes={acceptedMimeTypes}
        label="Upload Files"
        description="You can upload up to 5 files. Files can be up to 50MB. You can upload .jpg and .pdf file formats."
        disabled={files.length + fileRejections.length >= maxFiles}
        maxSizeInBytes={maxSizeInBytes}
        maxFiles={maxFiles}
        onAccepted={setFiles}
        onRejected={setFileRejections}
        renderFile={(file, index) => {
          const { name, size, type } = file;
          const renderFileCountError = index === 0 && fileCountOverLimit > 0;

          const fileRejection = fileRejections.find(
            (fileRejection: FileRejection) =>
              fileRejection.file === file &&
              fileRejection.reason !== FileRejectionReason.OverFileLimit
          );
          const { message } = fileRejection || {};

          return (
            <React.Fragment key={`${file.name}-${index}`}>
              {renderFileCountError && (
                <Alert
                  intent="danger"
                  marginBottom={majorScale(2)}
                  title={fileCountError}
                />
              )}
              <FileCard
                isInvalid={fileRejection != null}
                name={name}
                onRemove={() => handleRemove(file)}
                sizeInBytes={size}
                type={type}
                validationMessage={message}
              />
            </React.Fragment>
          );
        }}
        values={values}
      />
    </Pane>
  );
}
