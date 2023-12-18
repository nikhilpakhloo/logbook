import React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import logo from "../assets/diveroidemaillogo.jpg";
import product from "../assets/product.gif";
export default function Email() {
  return (
    <Html>
      <Head />
      <Preview>""</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={logo}
                width="350"
                height="100"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>

            <Text className="text-black text-[14px] leading-[24px] text-center">
              Dear <strong> Nikhil</strong>,
            </Text>
            <Text className="text-black text-[14px] leading-[24px] text-center">
              <Link href="https://en.diveroid.com/" className="text-black">
                <strong>Diveroid</strong>{" "}
              </Link>
              has invited you to join in Unveiling Something Extraordinary:
              <Link href="https://www.kickstarter.com/" className="text-black">
                <strong>Kickstarter</strong>
              </Link>{" "}
              Launch in <strong>February!</strong>
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img className="w-full h-40" src={product} />
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center py-3 px-5"
                href="https://www.kickstarter.com/projects/officialdiveroid"
              >
                Join the Project
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href="" className="text-blue-600 no-underline">
                https://www.kickstarter.com/projects/officialdiveroid
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black">Diver </span>.This invite was sent
              from <span className="text-black">124.20.12.12</span> located in{" "}
              <span className="text-black">Korea</span>. If you were not
              expecting this invitation, you can ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
