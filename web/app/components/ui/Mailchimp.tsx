"use client";
import React, { useState } from "react";
// import PropTypes from "prop-types"
import jsonp from "jsonp";
// import PropTypes from "prop-types";
// import styled, { css } from "styled-components"
import clsx from "clsx";
import { publish } from "pubsub-js";
import { _localizeText } from "@/app/utils/utils";

type FieldProp = {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
};

type Props = {
  action: string;
  // field: FieldProp;
  fields: FieldProp[];
};

const Mailchimp = (props: Props) => {
  const messages = {
    sending: "sending...",
    success: "Inscription validée. Merci!",
    error: "Erreur :(",
    empty: "E-mail vide.",
    duplicate: "Trop de tentatives d'inscription pour cette adresse e-mail",
    button: "Subscribe",
  };

  const { fields, action } = props;
  // const { messages } = Mailchimp.defaultProps
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<any>([]);
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const getButtonMsg = () => {
    switch (status) {
      case "sending":
        return messages.sending;
      case "success":
        return messages.success;
      case "duplicate":
        return messages.duplicate;
      case "empty":
        return messages.empty;
      case "error":
        return messages.error;
      default:
        return messages.button;
    }
  };
  console.log(state);
  const handleSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    // alert("submit");
    evt.preventDefault();
    const values = fields
      .map((field) => {
        return `${field.name}=${encodeURIComponent(state[field.name])}`;
      })
      .join("&");
    const path = `${action}&EMAIL=${encodeURIComponent(email)}`;
    const url = path.replace("/post?", "/post-json?") + values;
    // console.log(values);
    console.log(url);
    // const email = state["EMAIL"]
    sendData(url);
    // validateEmail(email) ? sendData(url) : setStatus("empty");
  };

  const validateEmail = (email: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const sendData = (url: string) => {
    setStatus("sending");
    jsonp(url, { param: "c" }, (err: any, data: any) => {
      console.log(err);
      console.log(data);
      if (data.msg.includes("already subscribed")) {
        setStatus("duplicate");
      } else if (err) {
        setStatus("error");
      } else if (data.result !== "success") {
        setStatus("error");
      } else {
        setStatus("success");
        setTimeout(() => {
          publish("NEWSLETTER_TOGGLE", false);
        }, 2000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={clsx("mailchimp")}>
      {!open && (
        <button onClick={() => setOpen(true)} className='text-left'>
          {_localizeText("openNewsletter")}
        </button>
      )}
      {open && (
        <div className='inner'>
          {fields &&
            fields.length > 0 &&
            fields.map((item, i) => (
              <input
                {...item}
                key={i}
                role='textbox'
                onChange={({ target }) => {
                  setState((rax: any) => ({
                    ...rax,
                    [item.name]: target.value,
                  }));
                }}
                defaultValue={state[item.name]}
                className='w-full'
              />
            ))}
          <button
            disabled={status === "sending" || status === "success"}
            type='submit'
            aria-label='submit'
            className={" "}>
            <span>{getButtonMsg()}</span>
          </button>
        </div>
      )}
    </form>
  );
};
export default Mailchimp;

// Mailchimp.defaultProps = {
//   messages: {
//     sending: "sending...",
//     success: "Inscription validée. Merci!",
//     error: "Erreur :(",
//     empty: "E-mail vide.",
//     duplicate: "Trop de tentatives d'inscription pour cette adresse e-mail",
//     button: "send",
//   },
//   buttonClassName: "",
//   // styles: {
//   //   sendingMsg: {
//   //     color: "#0652DD"
//   //   },
//   //   successMsg: {
//   //     color: "#009432"
//   //   },
//   //   duplicateMsg: {
//   //     color: "#EE5A24"
//   //   },
//   //   errorMsg: {
//   //     color: "#ED4C67"
//   //   }
//   // }
// }

// Mailchimp.propTypes = {
//   action: PropTypes.string,
//   messages: PropTypes.object,
//   fields: PropTypes.array,
//   styles: PropTypes.object,
//   className: PropTypes.string,
//   buttonClassName: PropTypes.string,
// }
