"use client";

import { useRef } from "react";
import type { ArrayOfObjectsInputProps, ObjectSchemaType, Uploader } from "sanity";

/**
 * The Photos array plus a button that uploads many photos in one go.
 *
 * Studio only batch-uploads when files are dropped on the array box itself.
 * Dropping several files into a single photo's edit dialog (after "Add item")
 * keeps just the first one, which is what the client kept hitting (call,
 * 17 Sep 2026). This button feeds every selected file through the array's
 * own upload path, so each becomes its own photo at the end of the list.
 */
export function PhotosInput(props: ArrayOfObjectsInputProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  // Image types are object schema types; the array's `of` union is wider.
  const imageType = props.schemaType.of.find((type) => type.name === "image") as
    | ObjectSchemaType
    | undefined;

  const handleFiles = (files: FileList | null) => {
    if (!files || !imageType) return;
    for (const file of Array.from(files)) {
      const uploader = props.resolveUploader(imageType, file);
      if (uploader) props.onUpload({ file, schemaType: imageType, uploader: uploader as Uploader });
    }
    // Let the same files be picked again if needed.
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div>
      {imageType && !props.readOnly ? (
        <div style={{ marginBottom: 8 }}>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(event) => handleFiles(event.currentTarget.files)}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            style={{
              padding: "8px 14px",
              borderRadius: 4,
              border: "1px solid currentColor",
              background: "transparent",
              color: "inherit",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            Upload several photos…
          </button>
        </div>
      ) : null}
      {props.renderDefault(props)}
    </div>
  );
}
