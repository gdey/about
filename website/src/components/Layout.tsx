import * as React from 'react'
import Helmet from 'react-helmet'
import '../css/styles.scss'
import { Footer } from './Footer'
import Header from './Header'

interface LayoutProps {
    meta?: {
        title?: string
        description?: string
        image?: string
        icon?: string
    }
    location: {
        pathname: string
    }
    children: React.ReactNode
    minimal?: boolean
}

export default class Layout extends React.PureComponent<LayoutProps> {
    public render(): JSX.Element | null {
        const defaultMetaProps: LayoutProps['meta'] = {
            title: 'Sourcegraph - Code search and intelligence',
            description:
                'Sourcegraph is a free, self-hosted code search and intelligence server that helps developers find, review, understand, and debug code. Use it with any Git code host for teams from 1 to 10,000+.',
            image: 'https://about.sourcegraph.com/sourcegraph-mark.png',
            icon: 'https://about.sourcegraph.com/favicon.png',
        }
        const pathname = this.props.location.pathname
        const isHome = pathname === '/'
        const isBlog = pathname === '/blog'
        const isProductPage = pathname.startsWith('/product/')
        const metaProps = {...defaultMetaProps, ...this.props.meta}

        return (
            <div className="flex flex-column fill-height">
                <Helmet>
                    <title>{metaProps.title}</title>
                    <meta name="twitter:title" content={metaProps.title} />
                    <meta name="twitter:site" content="@srcgraph" />
                    <meta name="twitter:image" content={metaProps.image} />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:description" content={metaProps.description} />

                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={metaProps.title} />
                    <meta property="og:image" content={metaProps.image} />
                    <meta property="og:description" content={metaProps.description} />

                    <meta name="description" content={metaProps.description} />
                    <link rel="icon" type="image/png" href={metaProps.icon} />
                    <link rel="icon" type="image/png" href={metaProps.image} />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
                </Helmet>
                <Header isHome={isHome} isBlog={isBlog} isProductPage={isProductPage} minimal={this.props.minimal} />
                <section className="d-flex flex-column fill-height">{this.props.children}</section>
                <Footer minimal={this.props.minimal} />
            </div>
        )
    }
}
