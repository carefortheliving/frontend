import { DiscussionEmbed } from 'disqus-react';
import { DisqusProps } from 'src/types'

export default function Footer(props: DisqusProps) {
    return (
        <DiscussionEmbed
            shortname='Comments'
            config={
                {
                    url: props.url,
                    identifier: props.id,
                    title: props.title,
                    language: props.language	
                }
            }
        />
    )
}