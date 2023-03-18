import Config from "@/config/config";

const ContactEmail = () => {
  return (
    <a href={`mailto:${Config.CONTACT_EMAIL}`}> {Config.CONTACT_EMAIL} </a>
  );
};

export default ContactEmail;
