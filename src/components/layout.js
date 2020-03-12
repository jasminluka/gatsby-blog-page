import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {
  Row,
  Col
} from 'reactstrap'

import Header from "./header"
import Footer from './Footer'
import Sidebar from './Sidebar'

import "../styles/index.scss"

const Layout = ({ title, postAuthor, authorImage, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossOrigin="anonymous"></link>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container" id="content">
        <h1>{title}</h1>
        <Row>
          <Col md="8">
            {children}
          </Col>
          <Col md="4">
            <Sidebar postAuthor={postAuthor} authorImage={authorImage} />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
