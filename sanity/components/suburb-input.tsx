"use client";

import { useEffect, useState } from "react";
import { SelectInput, useClient, type StringInputProps } from "sanity";
import { suburbs } from "../../lib/content/suburbs";
import { apiVersion } from "../env";

type SuburbOption = { title: string; value: string };

const query = `*[_type == "suburb" && defined(name) && defined(slug.current)]
  | order(name asc) {"title": name, "value": slug.current}`;

/** Keep the existing string slug format while sourcing choices from the CMS. */
export function SuburbInput(props: StringInputProps) {
  const client = useClient({ apiVersion });
  const [options, setOptions] = useState<SuburbOption[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    let request = 0;
    const refresh = async () => {
      const current = ++request;
      try {
        const result = await client.fetch<SuburbOption[]>(query, {}, {
          perspective: "published",
          useCdn: false,
        });
        if (!active || current !== request) return;
        // Match the site's fixture fallback when the dataset has no suburbs.
        setOptions(result.length ? result : suburbs
          .map((s) => ({ title: s.name, value: s.slug }))
          .sort((a, b) => a.title.localeCompare(b.title)));
        setError(false);
      } catch {
        if (active && current === request) setError(true);
      }
    };

    const subscription = client.listen('*[_type == "suburb"]', {}, {
      includeResult: false,
      visibility: "query",
    }).subscribe({
      next: () => void refresh(),
      error: () => { if (active) setError(true); },
    });
    void refresh();
    // Also refresh on returning from another Studio tab.
    window.addEventListener("focus", refresh);
    return () => {
      active = false;
      subscription.unsubscribe();
      window.removeEventListener("focus", refresh);
    };
  }, [client, attempt]);

  const choices = [...(options ?? [])];
  // Preserve an existing selection even if its suburb was unpublished/deleted.
  if (props.value && !choices.some((option) => option.value === props.value)) {
    choices.push({ title: `${props.value} (current value)`, value: props.value });
  }

  return (
    <div>
      <SelectInput
        {...props}
        readOnly={props.readOnly || options === null}
        schemaType={{
          ...props.schemaType,
          options: { ...props.schemaType.options, list: choices },
        }}
      />
      {error ? (
        <p role="alert">
          Could not refresh suburbs. <button type="button" onClick={() => setAttempt((n) => n + 1)}>Retry</button>
        </p>
      ) : options === null ? <p role="status">Loading suburbs…</p> : null}
    </div>
  );
}
