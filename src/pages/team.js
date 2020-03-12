import React from "react"
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  CardText,
  Button
} from 'reactstrap'

import Layout from "../components/layout"
import SEO from "../components/seo"
import authors from '../utils/authors'
import { slugify } from '../utils/utilities'
import JohnImage from '../images/john.jpg'
import JaneImage from '../images/jane.jpg'

const TeamPage = () => (
  <Layout title="Our team">
    <SEO title="Team" keywords={['gatsby', 'application', 'react']} />
    <Row className="mb-4">
      <div className="col-md-4">
        <img src={JohnImage} style={{ maxWidth: '100%'}} alt="John profile" />
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: '100%' }}>
          <CardBody>
            <CardTitle>{authors[0].name}</CardTitle>
            <CardText>{authors[0].bio}</CardText>
            <Button className="text-uppercase" color="primary" href={`/author/${slugify(authors[0].name)}`}>View posts</Button>
          </CardBody>
        </Card>
      </div>
    </Row>
    <Row className="mb-4">
      <div className="col-md-4">
        <img src={JaneImage} style={{ maxWidth: '100%'}} alt="Jane profile" />
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: '100%' }}>
          <CardBody>
            <CardTitle>{authors[1].name}</CardTitle>
            <CardText>{authors[1].bio}</CardText>
            <Button className="text-uppercase" color="primary" href={`/author/${slugify(authors[1].name)}`}>View posts</Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
)

export default TeamPage