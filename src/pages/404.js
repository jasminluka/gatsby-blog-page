import React from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout title="Oops something went wrong..">
    <SEO title="404: Not found" />
    <Link to={'/'} className="btn btn-primary text-uppercase">Go back</Link>
  </Layout>
)

export default NotFoundPage
