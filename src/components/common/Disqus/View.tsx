import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DiscussionEmbed } from 'disqus-react';
import React from 'react';
import { DisqusProps } from 'src/types';

const Disqus = (props: DisqusProps) => {
	return (
		<Card>
			<CardContent>
				<DiscussionEmbed
					shortname="https-carefortheliving-org"
					config={{
						url: props.url,
						identifier: props.id,
						title: props.title,
						language: props.language,
					}}
				/>
			</CardContent>
		</Card>
	);
};

export default Disqus;
