import React, { useState, useEffect } from 'react';
const MyComponent = ({Body}) => {
  const [htmlContent, setHtmlContent] = useState(null);
  useEffect(() => {
    setHtmlContent(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      </head>
      <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
          <tbody>
            <tr style="width:100%">
              <td><img alt="Koala" height="50" src="https://1jy92e.p3cdn1.secureserver.net/wp-content/uploads/2024/02/zentrades-white-logo-2048x282-1.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" width="170" />
                <p style="font-size:16px;line-height:26px;margin:16px 0">Hi <!-- -->User<!-- -->,</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">${Body}</p>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
                  <tbody>
                    <tr>
                      <td><a href="https://zentrades.pro/" style="background-color:#cd3f3f;border-radius:3px;color:#fff;font-size:16px;text-decoration:none;text-align:center;display:inline-block;padding:12px 12px 12px 12px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Get started</span><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                    </tr>
                  </tbody>
                </table>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />The zentrades team</p>
                <hr style="width:100%;border:none;border-top:1px solid #EAEAEA;border-color:#cccccc;margin:20px 0" />
                <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">pune ,India 411041</p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
`);
  }, []);
  return (
    <div dangerouslySetInnerHTML={{__html:htmlContent}}>
    </div>
  );
};
export default MyComponent;