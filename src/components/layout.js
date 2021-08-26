import React from "react"
import Header from "./header"

class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    // const rootPath = `${__PATH_PREFIX__}/`
    // let header

    // if (location.pathname === rootPath) {
    //   header = (
    //     <h1
    //       style={{
    //         ...scale(1.5),
    //         marginBottom: rhythm(1.5),
    //         marginTop: 0,
    //       }}
    //     >
    //       <Link
    //         style={{
    //           boxShadow: `none`,
    //           textDecoration: `none`,
    //           color: `inherit`,
    //         }}
    //         to={`/`}
    //       >
    //         {title}
    //       </Link>
    //     </h1>
    //   )
    // } else {
    //   header = (
    //     <h3
    //       style={{
    //         fontFamily: `Montserrat, sans-serif`,
    //         marginTop: 0,
    //       }}
    //     >
    //       <Link
    //         style={{
    //           boxShadow: `none`,
    //           textDecoration: `none`,
    //           color: `inherit`,
    //         }}
    //         to={`/`}
    //       >
    //         {title}
    //       </Link>
    //     </h3>
    //   )
    // }
    return (
      <div className="container">
        <div className="content">
          <Header siteTitle={title} />
          <hr></hr>
          <main>{children}</main>
        </div>
        <footer>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://abdenasser.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abdenasser Elidrissi
          </a>
          <div className="social-links">
            <a
              href="https://twitter.com/__abdenasser"
              target="_blank"
              rel="noopener noreferrer"
            >
              twitter
            </a>{" "}
            &bull;{" "}
            {/* <a
              href="https://instagram.com/veryben"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram
            </a>{" "}
            &bull;{" "} */}
            <a
              href="https://github.com/Abdenasser"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>{" "}
            &bull;{" "}
            <a
              href="https://www.linkedin.com/in/abdenasser/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
