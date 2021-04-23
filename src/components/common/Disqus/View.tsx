import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { DisqusProps } from 'types';

export default function Disqus({
  url, identifier, title, language,
}: DisqusProps) {
  return (
    <DiscussionEmbed
      shortname="Comments"
      config={
        {
          url,
          identifier,
          title,
          language,
        }
      }
    />
  );
}
