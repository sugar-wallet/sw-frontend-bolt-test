import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { DATE_TIME_FORMATS } from '@sw-npm-packages/constants'
import { Dayjs } from '@sw-npm-packages/utils'

interface IProps {
  displayModal: boolean
  setDisplayModal: () => void
}

const TermsAndConditionModal: React.FC<React.PropsWithChildren<IProps>> = ({
  displayModal,
  setDisplayModal
}) => {
  const t = useTranslations('AutoInvestPage')
  return (
    <div className="App">
      {/* <button
      className="Button CenterAlign"
      onClick={() => setDisplayModal(!displayModal)}
    >
      Settings
    </button> */}

      <div
        className={`terms-modal d-flex flex-col ${displayModal ? 'Show' : ''}`}
      >
        <div className="top-seperator"></div>
        <div className="d-flex align-center justify-between">
          <button
            className="Close pr-2"
            onClick={() => setDisplayModal(!displayModal)}
          >
            X
          </button>
        </div>
        <h3 className=" w-[90%] text-center self-center">
          {t('termsAndConditions')}
        </h3>
        <div className="mt-2 text-xs text-center d-flex items-center justify-center">
          {t('lastUpdatedAt', {
            dateTime: Dayjs().format(DATE_TIME_FORMATS.dateTime)
          })}
        </div>
        <div className="h-full overflow-scroll mt-3 d-flex flex-column">
          <div className="TermsOfUse d-flex flex-col gap-3">
            <p className="text-sm font-light">
              Please note, our app goes through changes every week. Some of this
              information may get out-dated or inaccurate quickly. We will
              ensure this is maintained to the latest version monthly. You can
              request the latest version if you feel that something isn’t the
              same during your app experience.
            </p>
            <h4 className="text-base">1. Overview</h4>

            <p className="text-sm font-light flex flex-col gap-2">
              <span>1.1. Welcome to Sugar Wallet’s Gold Feature.</span>

              <span>
                1.2. The world of investments is full of acronyms and confusing
                terms. So, we want to be really clear about what we both agree
                to when you use our Gold Service via the Sugar Wallet App.
              </span>

              <span>1.3. That’s what these Terms of Use (Terms) cover.</span>

              <span>
                1.4. These Terms apply to you as soon as you set up an account
                to begin using our Service. Even if you have not signed up to an
                account with Sugar Wallet, these Terms will in part apply when
                you visit our Website or App.
              </span>

              <span>
                1.5. We intend to innovate, grow, and change. So, these Terms
                may also need to change in future. We reserve the right to amend
                these Terms at any time, effective upon posting the modified
                Terms on the Website and in the App. Any amendments will apply
                to your continued use of the Service, App and Website under
                updated Terms.
              </span>

              <span>
                1.6. To make it easy, we’ll tell you when we last updated these
                Terms at the top of the page. If the changes are significant,
                we’ll communicate the changes to you via email (if you have
                signed-up to the Service). By continuing to use the Service, our
                Website and/or App, you are deemed to have read, understood and
                agreed to the most recent Terms available.
              </span>

              <span>
                1.7. Please read these Terms alongside our{' '}
                <a
                  style={{ color: 'blue', textDecoration: 'underline' }}
                  href="https://sugarwallet-files.s3.ap-southeast-2.amazonaws.com/Privacy+Policy+v1app+(1).pdf"
                >
                  Privacy Policy
                </a>
                . This Privacy Policy tells you what information we might
                collect about you, and how we might use that information.
              </span>

              <span>
                1.8. You indemnify us against all claims, costs, damage and loss
                arising from your breach of any of these Terms or any obligation
                you may have to us.
              </span>

              <span>1.9. You should read these Terms carefully.</span>
              <span>1.10 What you’ll find in these Terms:</span>
              <ul className="gap-1 flex flex-col">
                <li>● Who are we?</li>
                <li>● Our Service</li>
                <li>● Buying/Selling Gold – what you need to do</li>
                <li>● Buying/Selling – what we do</li>
                <li>● Fees – how we make money</li>
                <li>● Keeping your money secure</li>
                <li>● Keeping your account secure</li>
                <li>● Tax</li>
                <li>● Intellectual Property</li>
                <li>● Kids Accounts</li>
                <li>● Suspending or closing your account</li>
                <li>● Communicating with you</li>
                <li>● Contact us</li>
                <li>● Making a complaint</li>
              </ul>
            </p>

            <h4 className="text-base ">2. Who are we?</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>2.1. In these Terms:</span>

              <span>
                ● ‘we’, ‘us’, ‘our’, ‘Sugar’ or ‘Sugar Wallet’ refers to Sugar
                Limited, a company incorporated in New Zealand (company number
                8069156), which provides the Service to you. Our registered
                office is Suite 14278, 17b Farnham Street, Parnell, Auckland,
                1052, New Zealand
              </span>
              <span>● Our ‘Website’ is www.sugarwallet.co.nz</span>
              <span>
                ● Our ‘App’ is the Sugar Wallet App available for download
                through Google Play Store and the Apple App Store, and also
                refers to our web-app. Our web-app can be accessed via
                app.sugarwallet.co.nz
              </span>
            </p>

            <h4 className="text-base ">3. Our Service</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                3.1. Our Gold Service enables individuals to acquire gold
                bullion via the App. We place buy and sell orders of gold
                bullion at your request, on your behalf.
              </span>
              <span>3.2. Via the App, you can also:</span>
              <span>
                3.2.1. Link a bank account to your Sugar Wallet account for
                purchasing gold
              </span>

              <span>
                3.2.2. Request us to buy gold bullion, on your behalf (ie
                deposit funds), through live pricing
              </span>

              <span>
                3.2.3. Request us to sell your gold bullion, and transfer the
                proceeds to you (ie withdraw funds), through live pricing
              </span>

              <span> 3.2.4. Track the balance of gold you own</span>

              <span> 3.2.5. View your transaction history</span>

              <span>3.2.6. View relevant product information on the gold.</span>

              <span>
                3.3. As a user of the Service, you agree to comply with the
                requirements to use our Service:
              </span>

              <span>● You must be aged 18 years or older;</span>

              <span>
                ● You must tell us straight away if your information changes at
                any time;
              </span>

              <span>● You must comply with the Law.</span>

              <span>
                3.4. You must create an account to use our Service. When you do
                so, you:
              </span>

              <span>
                3.4.1. warrant that any information you provide is accurate;
              </span>

              <span>3.4.2. must complete all parts of the application;</span>

              <span>
                3.4.3. may need to provide further information to us at our
                request, in particular for compliance purposes.
              </span>

              <span>
                3.5. We do not have to open an account for you or provide any
                reasons for not doing so. However, we will seek to explain the
                reasons.
              </span>

              <span>
                3.6. We are not licensed to provide (and do not provide)
                regulated financial advice. The information we provide via our
                Service is not (and must not be taken as) recommendations or
                personalised investing, tax, legal or financial advice. We do
                not take account of your particular investment objectives,
                financial situation or investment needs when providing
                information to you.
              </span>

              <span>
                3.7. You should read the terms of use and privacy policy before
                buying gold via Sugar. You should also seek advice from an
                independent financial adviser to help you make investment
                decisions, including if you are not sure if our Service or any
                particular investment is right for you.
              </span>
              <span>
                3.8. You need to comply with our rules for use of information we
                provide via the App or Website, which is that:
              </span>

              <span>
                3.8.1. this information is only for your personal use, and you
                won’t provide it to anyone else, copy it, or reproduce it;
              </span>

              <span>
                3.8.2. it remains our property or that of our third-party
                suppliers; and
              </span>

              <span>
                3.8.3. if we give you notice of additional policies,
                restrictions, or other terms and conditions for the use of the
                information, you’ll comply with these too.
              </span>

              <span>
                3.9. Neither we nor third-party providers take responsibility
                for, or guarantee the availability, timeliness, reliability,
                accuracy, or completeness of any information that is provided
                via the App or Website.
              </span>

              <span>
                3.10. We can change or stop providing all or any part of the
                information to you at any time, without giving you notice.
              </span>

              <span>
                3.11. To the extent permitted by law, the information on the
                Website and App is not an offer to sell or a solicitation to buy
                any financial product, security or other product or service from
                us.
              </span>

              <span>
                3.12. While we intend our Service to be available 24 hours a
                day, seven days a week, your access to the Service and the
                Website is on an ‘as is, where is, as available’ basis. That
                means there might be times when you can’t access either the
                Service or our Website.
              </span>

              <span>
                3.13. If for any reason we must interrupt the Service or our
                Website for longer periods than we would anticipate, we will
                seek to communicate details of such interruption via email, on
                the App or on the Website ahead of time.
              </span>
              <span>
                3.14. In the case of technical problems, you must make all
                reasonable efforts to investigate and diagnose problems before
                contacting us at hello@sugarwallet.com.
              </span>
              <span>
                3.15. We may monitor your access to and use of our Service and
                Website. Such usage information may be used by us. For example,
                as inputs to improve the functionality of the Service or to
                ensure we meet legal and regulatory requirements.
              </span>
              <span>
                3.16. We give no warranty about the Service or Website. In
                particular, we do not warrant that the Service will meet your
                requirements or that it will be suitable for any particular
                purpose.
              </span>
              <span>3.17. We are not liable for:</span>
              <span>
                3.17.1. loss or damage suffered by you through your use of our
                App, or your inability to access our Website, Web-app or App; or
              </span>
              <span>
                3.17.2. loss, fees or costs you incur or suffer when using our
                Service; or
              </span>
              <span>
                3.17.3. malicious code, viruses, blocked access or if our
                Website or App does not work.
              </span>
              <span>
                3.18. Sometimes, we might direct you to other websites through
                links on our Website or App. We can’t control the content of
                those websites and won’t be responsible for what you might find
                there. You should check the terms of use for those websites.
              </span>
              <span>
                3.19. Our Service is delivered to you digitally, therefore we
                operate on a paperless basis.
              </span>
            </p>

            <h4 className="text-base">
              4. Buying/Selling Gold – what you need to do
            </h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                4.1. ACKNOWLEDGING RISK - Sugar’s gold feature is a commodity
                buying/selling feature specialising in physical precious metals.
                You acknowledge that this feature is not a financial product or
                the feature does not provide any financial advice and no offer
                or other disclosure document has been, or will be, prepared in
                relation to the Services, the Website, Bullion and/or other
                services, under the Financial Markets Conduct Act 2013, the
                Financial Advisers Act 2008 or any other similar legislation.{' '}
              </span>
              <span>
                4.2. BULLION - You acknowledge and agree that Bullion is a
                commodity that is priced according to a highly volatile, often
                fast moving market that may be turbulent. Accordingly, the
                trading and/or holding of Bullion carries significant risk and
                you should careful consider and assess whether trading or
                holding of Bullion is suitable for you depending upon your
                financial circumstances and tolerance to risk and you should
                take independent financial advice.
              </span>

              <span>4.3. During sign-up, you will:</span>
              <span>
                ● Link your bank account to Sugar Wallet through a bank feed
                provider. You must use a New Zealand registered bank account as
                your nominated bank account.
              </span>

              <span>
                4.4. Log in to the App to request us to buy or sell gold on your
                behalf.
              </span>
              <span>
                4.5. To buy gold – making a deposit on the App - you can either:
              </span>
              <span>
                4.5.1. Request a one-off buy order of any amount. You do this by
                selecting the ‘Buy Gold’ button on the home tab or selecting the
                ‘buy’ tab in the App, and then choosing the amount you wish to
                purchase. The payment will be made via our chosen bank feed
                provider: Akahu. The funds will be deposited from your linked
                bank account to Sugar Limited’s bank account; or
              </span>
              <span>
                4.5.2. Set up an investment plan; weekly, fortnightly or
                monthly. Gold will be purchased on the chosen day and the chosen
                frequency there after. The funds will be deposited from your
                linked bank account to Sugar Limited’s bank account in the
                frequency you have chosen. You can amend or cancel this
                recurring purchase in the ‘invest’ tab on the App.
              </span>
              <span>4.6. The minimum investment amount is $1 NZD.</span>
              <span>
                4.7. There is no maximum payment limit on the amount you wish to
                deposit for either one-off deposits or as part of your recurring
                purchase plan. This may be subject to change.
              </span>
              <span>
                4.8. You can access more information on the gold you have
                purchased by selecting “Open Safe” on the home screen of the
                App, it will show your owned grams, investment value, and the
                gold you have invested in.
              </span>
              <span>
                4.9. If you place an order for Gold through us, you agree that
                you’ve read and understood the Terms of Use.
              </span>
              <span>
                4.10. When setting up a recurring purchase plan, if the first
                deposit date is set in the past then you agree that we can amend
                the start date to one in the future which is consistent with the
                recurring purchase you have chosen. For example, if you set up a
                monthly investment to occur on 2nd of May 2024, then we may
                amend the start date to 2nd of June 2024. We will inform you in
                these cases.
              </span>
              <span>
                4.11. To sell gold – withdrawing funds on the App – you select
                the ‘Sell’ tab on the App and direct us to withdraw a certain
                amount of grams of your owned gold. If you are using the web-app
                you may need to enter your banking details on the account
                details section. This value will be returned to your linked bank
                account once the relevant gold has been sold and the proceeds
                received by Sugar.
              </span>
              <span>4.12. You can withdraw part or all of your Gold.</span>
              <span>
                4.13. Your balance on the App informs you of the value of your
                Gold. The buy and sell price also informs the realisable value
                of your gold.
              </span>
              <span>
                4.14. We are not responsible for returns, calculations, or
                performance information. Nor are we responsible for any reliance
                placed on this information provided via the Service.
              </span>
              <span>
                4.15. We do not owe you assets of any kind if we fail to take a
                deposit from your account in the process set out in these Terms,
                and therefore we either do not buy gold or purchase them later
                than you might expect. The same applies to any sell orders that
                are put through later than you might expect.
              </span>
              <span>
                4.16. The returns, calculation and performance information in
                the Service may use or include information from third-party
                sources. Any returns or information displayed may be estimates
                and calculated based on the most recent gold price.
              </span>
            </p>

            <h4 className="text-base">5. Buying/Selling Gold – what we do</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                5.1. The prices on the app are live, so once you place your buy
                or sell order, the price is locked in.
              </span>
              <span>5.2. Public holidays do not count as working days.</span>
              <span>
                5.3. For buy orders we will buy the maximum amount of gold
                possible given the price at the time you confirm the order.
              </span>
              <span>
                5.4. For sell orders, we will sell the exact amount of grams you
                request, and pay you out the amount according to the sell price
                minus any fees.. Under extremely rare circumstances, we won’t be
                able to buy back your gold, but this gold will then be available
                for you to sell on your own means.
              </span>
              <span>
                5.5. If you withdraw all the gold in your account, then this
                requires us to sell all the gold you hold. You will be paid out
                according to the live sell price you locked in when confirming
                the order.
              </span>
              <span>
                5.6. The sale proceeds received from your withdrawal request,
                will be the withdrawal amount, less any fees.
              </span>
              <span>
                5.7. If we transfer to you money that is not yours for any
                reason (for example, if we send you more money than your gold
                was sold for, or if we mistakenly pay you instead of another
                customer) then we will seek to retrieve the funds. We will
                follow this process:
              </span>
              <span>
                5.7.1. We will contact you in the first instance to ask for the
                money to be returned to Sugar Limited’s bank account. If this
                fails, then we will,
              </span>
              <span>
                5.7.2. ask Sugar Limited’s banking provider to contact your
                banking provider to request reimbursement. In this case,
              </span>
              <span>
                5.7.3. your banking provider may get in contact with you to
                authorise reimbursement.
              </span>
              <span>
                5.8. We can’t process your one-off purchase or recurring
                purchase if you don’t have enough funds in your linked bank
                account or card. For one-off purchases, the transaction simply
                will not go through. For recurring purchases, the system will
                try to process your purchase once more in each of the following
                two days. Regardless, the recurring purchase will remain in
                place for the next scheduled purchase. You will receive a
                message via Email and/or a messaging service e.g. SMS or
                Whatsapp.
              </span>
              <span>
                5.9. Even if we can process your purchase, the buy or sell
                orders you request may not always be fulfilled. For example, you
                may be suspended or delayed from selling the gold or our
                provider may suspend or restrict trading.
              </span>
              <span>
                5.10. We may credit your account as a gift for any reason. For
                example, if we made an error or as part of promotional
                activities. In this case, we will purchase gold to the
                equivalent value of the credit.
              </span>
              <span>5.11. This gold product is not:</span>
              <span>
                5.11.1. the issuing, managing or storing the physical gold
                available via the Service and do not accept responsibility for
                the performance of any investments; or
              </span>
              <span>
                5.11.2. providers of discretionary investment management
                services. We act on your instructions; or
              </span>
              <span>5.11.3. providing financial advice of any kind.</span>
              <span>
                5.12. We can put limits on orders or cancel orders if we feel it
                necessary to comply to anti-money laundering or other
                regulations relevant to the service.
              </span>
              <span>
                5.13. A gold purchase is subject to multiple risks which could
                involve delays in repayment and loss of income or principal
                invested.
              </span>
            </p>

            <h4 className="text-base">6. Fees – how we make money</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>6.1. There are three types of fees we charge.</span>
              <span>
                6.2. Insured Storage fee: we charge 1% annually of the dollar
                value of gold held with us on your behalf. This fee is
                calculated daily and deducted monthly or at time of a withdrawal
                if the fee is pending from the grams you own at the time of the
                order being processed.
              </span>
              <span>
                6.3. Buy and sell transaction fee on each buy/sell order of
                gold: 1% of the deposit or withdrawal amount.
              </span>
              <span>
                6.4. The selling price of gold is lower than the buying price;
                and is subject to change multiple times a day. The spread given
                by the supplier is at around 1.8%, but fluctuates daily.
              </span>
              <span>
                6.5. You can find details of the current fees in your Sugar
                Wallet App in the fees section of your investment info.
              </span>
              <span>
                6.6. We’ll let you know by sending a notification via the App
                and/or by email, if we’re going to:
              </span>
              <span>6.6.1. introduce additional fees; or</span>
              <span>6.6.2. amend fee levels; or</span>
              <span>6.6.3. change the way in which we deduct fees; or</span>
              <span>6.6.4. change the date when we deduct fees.</span>
            </p>

            <h4 className="text-base">7. Keeping your money secure</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                7.1. Your money and investments in your account will be held by
                Sugar limited for 7 working days at a maximum, until it’s held
                in the form of gold with our provider in a secure vault. On our
                web-app, it goes to stripe and then our account.
              </span>
              <span>
                {`7.2.When you deposit money via the App or otherwise, that money
                  goes to Sugar’s New Zealand-registered bank account. The banks
                  used are independent of us, and we dont accept responsibility
                  for any default or delay in the distribution of money as a
                  result of their failure.`}
              </span>
              <span>
                7.3. Your money may be ‘pooled’ with other people’s money to
                purchase the gold.
              </span>
              <span>
                7.4. We will keep records of all money you have deposited and
                withdrawn from your account.
              </span>
            </p>

            <h4 className="text-base">8. Keeping your account secure</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                8.1. Our Website and App are secured through encryption and
                password protection technology. This adds a high level of
                security to your Sugar account and protects your sensitive
                information. Sugar also conducts additional security testing
                semi-annually to ensure the highest level of protection of your
                personal information.
              </span>
              <span>
                8.2. Multi-factor authentication for password protection and a
                timeout facility that automatically logs you out of the app
                after a period of inactivity to prevent unauthorised access.
              </span>
              <span>
                8.3. We will contact you about unusual account activity for
                protection against fraud.
              </span>
              <span>8.4. To help keep your account secure, you must not:</span>
              <span>
                8.4.1. create an account for someone else without their
                permission, or let others do the same for you; or
              </span>
              <span>
                8.4.2. Do not share your password or username with anyone; or
              </span>
              <span>
                8.4.3. try to log into another person’s account or try to bypass
                our security procedures
              </span>
              <span>
                8.4.4. take unsolicited calls or emails that could compromise
                your personal information or login details
              </span>
              <span>
                {`8.4.5. use the same PIN for your Sugar app as your device's
                  passcode. Try choosing a PIN that is difficult for others to
                  guess, and be mindful of your surroundings when entering your
                  PIN on the Sugar app.`}
              </span>
              <span>
                8.4.6. try to ‘break’ our website or decompile, reproduce,
                reverse engineer, or modify it, or misuse it in any way; and
              </span>
              <span>8.5. Do:</span>
              <span>
                8.5.1. keep your password and username secure and confidential;
              </span>
              <span>8.5.2. change your password regularly;</span>
              <span>
                8.5.3. keep the device you use to access our services safe, and
                make sure you change the password for that device regularly;
              </span>
              <span>
                8.5.4. notify us of any unauthorised use of your passwords or
                any other breach of security and we will reset your password.
              </span>
              <span>
                8.6. Unfortunately, transmitting information via the internet is
                not completely secure. Although we will do our best to protect
                your personal information, we cannot guarantee the security of
                your data transmitted via our Service; and any transmission is
                at your own risk.
              </span>
              <span>
                8.7. We will never contact you to ask you to disclose your
                security credentials. Be cautious about opening links contained
                in SMS messages or emails and beware of phishing scams.
              </span>
              <span>
                8.8. We may disable multi-factor authentication from your
                account with your agreement if issues arise that prevent you
                from otherwise logging on. Any activity that occurs on your
                account in this context will be held to a higher level of
                scrutiny given the additional risk.
              </span>
            </p>

            <h4 className="text-base">9. Tax</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                9.1. You are ultimately responsible for your own tax obligations
                with our gold product.
              </span>
            </p>

            <h4 className="text-base">10. Intellectual Property</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                10.1. We own (or have the right to use) the content, material,
                layout, and design of our Website and App and all documents and
                other materials that we use when we provide you with our
                Service. That includes our brand name and our logos.
              </span>
              <span>
                10.2. You can access, download, view, or print information
                contained on the Website or App for your own purposes (so long
                as it is for personal reasons).
              </span>
              <span>
                10.3. But otherwise, unless we give you written permission (or
                the law says you can), you can’t use, copy, modify, adapt,
                store, distribute, print, display, perform, publish, or
                redistribute any part of our Website or the App, or other
                documents and materials that we provide you via the App or
                otherwise.
              </span>
              <span>
                10.4. The data you input via the Sugar Wallet app or Website
                remains your property. You grant us a licence to use, copy,
                transmit, store, and back-up your information and data for the
                purposes of enabling you to access and use the Service and for
                any other purpose related to provision of services to you,
                including developing new products and services.
              </span>
              <span>
                10.5. We’ll only use your personal information in accordance
                with our Privacy Policy.
              </span>
            </p>

            <h4 className="text-base">11. Kids Accounts</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                11.1. We do not currently allow for accounts for people under
                18, nor do we enable adults to set up accounts on behalf of
                their kids.
              </span>
            </p>
            <h4 className="text-base">
              12. Suspending or closing your account
            </h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                12.1. We can suspend or terminate your access to the Service at
                any time, for any amount of time.
              </span>
              <span>
                12.2. We may do so whenever we think we need to, including if:
              </span>
              <span>12.2.1. you breach any of these Terms; or</span>
              <span>12.2.2. you fail to pay your fees; or</span>
              <span>
                12.2.3. we think the security of your account might be
                compromised; or
              </span>
              <span>12.2.4. the law says we should; or</span>
              <span>12.2.5. we think that there’s a risk of harm.</span>
              <span>
                12.3. If we suspend or terminate your account then we can sell,
                redeem, or withdraw investments made by you using our Service.
                If we do so, we’ll pay the net proceeds to your linked bank
                account (once we’ve deducted any costs, fees, expenses or other
                amounts owed to us).
              </span>
              <span>
                12.4. If you breach these Terms, and that breach results in
                someone making a claim against us (or telling us that they
                intend to), then you agree to cover all costs, expenses, and
                fees incurred or suffered by us in connection with that claim.
                But we’ll stay in control of that claim.
              </span>
              <span>
                12.5. You can suspend or terminate your account at any time.
              </span>
              <span>
                12.6. You can also ask us to delete certain information we hold
                as set out in the Privacy Policy.
              </span>
              <span>
                12.7. If you choose to suspend or close your account, or if you
                ask us to delete your details:
              </span>
              <span>12.7.1. you won’t be able to access our Service;</span>
              <span>12.7.2. we won’t refund any fees paid by you;</span>
              <span>
                12.7.3. we can sell, redeem, or withdraw investments made by you
                using our Service. If we do so, we’ll pay the net proceeds to
                your linked bank account (once we’ve deducted any costs, fees,
                expenses or other amounts owed to us).
              </span>
              <span>
                12.7.4. our rights and your obligations under these Terms won’t
                stop when it makes sense for them to continue.
              </span>
              <span>
                12.8. If we’re holding any of your money which becomes unclaimed
                money, we can account for that money in accordance with the
                Unclaimed Money Act 1971.
              </span>
            </p>

            <h4 className="text-base">13. Communicating with you</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>
                13.1. We’ll use the email address you provide to us to
                communicate with you. Please keep an eye out for important
                messages.
              </span>
              <span>
                13.2. We may additionally text you on the phone number from time
                to time on major updates or reaching out for a response for
                urgent matters.
              </span>
              <span>
                13.3. We might also send you emails about stuff we think you’ll
                be interested in, like new services and products we are
                offering, or information about investing.
              </span>
              <span>
                13.4. We don’t want to clog up your inbox. You can unsubscribe
                from marketing emails from us by selecting the ‘unsubscribe’
                button at the bottom of those emails (but, if you do, let us
                know if you later change your mind!)
              </span>
            </p>
            <h4 className="text-base"> 14. Contact us</h4>
            <p className="text-sm font-light gap-1 flex flex-col">
              <span>14.1. We’re here to help!</span>
              <span>
                14.2. If you’re stuck, need some help with our Service, or want
                to make a complaint, you can contact us by emailing
                hello@sugarwallet.com.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`Overlay ${displayModal ? 'Show' : ''}`}
        onClick={() => setDisplayModal(false)}
      />
    </div>
  )
}

export default TermsAndConditionModal
