import { useDocumentOperation, type DocumentActionComponent } from "sanity";

type ListingDraft = {
  status?: string;
  documents?: unknown[];
};

/**
 * Wraps the stock Publish action for listings so that publishing a listing
 * as Sold also drops its property documents (title, rates, LIM, disclosures).
 *
 * Agreed with the client at the 2 Sep 2026 handover: once a home is sold the
 * documents are clutter and shouldn't stay on the public page. Only the
 * attachments on the listing are removed — the uploaded files themselves stay
 * in the media library. The public query in lib/sanity/queries.ts also hides
 * documents on sold listings, so nothing leaks between edit and publish.
 */
export function clearDocumentsOnSold(
  originalPublish: DocumentActionComponent
): DocumentActionComponent {
  const PublishAndClear: DocumentActionComponent = (props) => {
    const { patch } = useDocumentOperation(props.id, props.type);
    const original = originalPublish(props);
    if (!original) return null;

    const draft = (props.draft ?? props.published) as ListingDraft | null;
    const clearing = draft?.status === "sold" && (draft.documents?.length ?? 0) > 0;
    if (!clearing) return original;

    return {
      ...original,
      label: "Publish & remove documents",
      title: "This listing is Sold, so its property documents will be removed on publish.",
      onHandle: () => {
        patch.execute([{ unset: ["documents"] }]);
        original.onHandle?.();
      },
    };
  };
  PublishAndClear.action = originalPublish.action;
  return PublishAndClear;
}
