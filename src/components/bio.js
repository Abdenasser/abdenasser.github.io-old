import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "profile-pic.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(1),
      }}
      className="bio"
    >
      <div
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(2),
          height: rhythm(2),
        }}
      >
        <Img fluid={data.placeholderImage.childImageSharp.fluid} alt="阿江" />
      </div>
      <p style={{ maxWidth: 400 }}>
        Hi 👋 I'm{" "}
        <a href="https://twitter.com/__abdenasser" target="_blank">
          @__abdenasser
        </a>{" "}
        and I'm a Husband, a Father.next and a Software Engineer.. I love coffee
        and computers!
        <br />
      </p>
    </div>
  )
}

export default Bio
