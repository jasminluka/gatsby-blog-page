import React from 'react'
import {
  Button,
  Badge
} from 'reactstrap'

import Layout from '../components/layout'
import SEO from '../components/seo';
import { slugify } from '../utils/utilities'

const TagsPage = ({ pageContext: { tags, tagPostCounts } }) => {
  return (
    <Layout title="All tags">
      <SEO title="All tags" keywords={['tags', 'topics']} />

      <ul>
        {
          tags.map(tag => (
            <li key={tag} style={{ marginBottom: '10px' }}>
              <Button color="primary" href={`/tag/${slugify(tag)}`}>
                {tag} <Badge color="light">{tagPostCounts[tag]}</Badge>
              </Button>
            </li>
          ))
        }
      </ul>
    </Layout>
  )
}

export default TagsPage