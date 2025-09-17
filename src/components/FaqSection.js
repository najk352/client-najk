import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FaqSection = () => {
  const faqs = [
    {
      q: 'What does Najah Global Hub Consultancy do?',
      a: 'We are Consultancy firm in liason with licensed recruitment agencies connecting professionals with global roles across multiple industries, offering full support from application to placement.'
    },
    {
      q: 'Who can apply?',
      a: 'Individuals with verifiable work experience, academic credentials, and identification (e.g., ID/passport).'
    },
    {
      q: 'How to apply?',
      a: 'You can apply through our online form on the "Apply Now" page or visit our office in person with all required documentation.'
    },
    {
      q: 'How long do registered profiles remain active?',
      a: 'Registered profiles remain active for up to 12 months for future job matches.'
    },
    {
      q: 'Does the agency provide visa support?',
      a: 'We provide guidance and assistance with the visa processing, but we do not guarantee visa approval as it is subject to embassy/consulate decisions.'
    },
    {
      q: 'What documents are required for application?',
      a: 'Typically, a comprehensive CV, a valid ID/passport, academic certificates, passport-size photos, a medical report, and a police clearance certificate (if required by the employer/destination country).'
    },
    {
      q: 'What is the placement timeline?',
      a: 'The timeline can vary from weeks to several months depending on the role, industry, and destination country. We keep our clients informed throughout the process.'
    },
    {
      q: 'Is pre-departure training provided?',
      a: 'Pre-departure training and orientation are offered depending on the specific job, employer requirements, and destination country regulations.'
    },
    {
      q: 'How do you assure the legitimacy of job offers?',
      a: 'We only partner with verified and reputable employers. All job offers are confirmed through official offer letters and contracts, ensuring transparency and security.'
    }
  ];

  return (
    <div className="faq-section bg-light">
      <Container>
        <h2 className="text-center mb-5">Frequently Asked Questions</h2>
        <Accordion defaultActiveKey="0">
          {faqs.map((faq, index) => (
            <Accordion.Item eventKey={String(index)} key={index}>
              <Accordion.Header>{faq.q}</Accordion.Header>
              <Accordion.Body>{faq.a}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
};

export default FaqSection;