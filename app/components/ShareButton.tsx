'use client'

import { FacebookShareButton, XShareButton, WhatsappShareButton, EmailShareButton, FacebookIcon, XIcon, WhatsappIcon, EmailIcon } from "react-share"

export default function ShareButton({ property }) {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
    console.log('property:', property.type)

    return (
        <div>
            <h3 className="text-xl font-bold text-center pt-2 mb-4">
                Share this property
            </h3>
            <div className="text-center mb-4">
                <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`# ${property.type.replace(/\s/g, '')}ForRent}`} className="mr-2">
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <XShareButton url={shareUrl} quote={property.name} hashtags={[`# ${property.type.replace(/\s/g, '')}ForRent}`]} className="mr-2">
                    <XIcon size={40} round={true} />
                </XShareButton>

                <WhatsappShareButton url={shareUrl} title={`Checkout this poperty ${property.name}`} className="mr-2">
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                {/* <EmailShareButton url={shareUrl} subject={`Checkout this property ${property.name}`}
                    body={`you might like this property : ${shareUrl}`} className="mr-2">
                    <EmailIcon size={40} round={true} />
                </EmailShareButton> */}
            </div>
        </div >
    )
}