import React, {useState} from "react";
import Link from "next/link";
import {faRss} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SubscribeForm = () => {
  const [status, setStatus] = useState<"SUCCESS" | "ERROR" | null>(null)
  const [email, setEmail] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    data.set("token", "");
    data.set("referrer", "");
    try {
      const FORM_URL = 'https://app.convertkit.com/forms/4951413/subscriptions'
      const response = await fetch(FORM_URL, {
        method: "post",
        body: data,
        headers: {
          accept: "application/json",
        },
      })

      setEmail("")
      const json = await response.json()
      setStatus(json.status === "success" ? "SUCCESS" : "ERROR")
    } catch {
      setStatus("ERROR")
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setEmail(value)
  }

  return (
    <div>
      <h2>
        Subscribe
      </h2>
      {status === "SUCCESS" && (
        <div>
          <p>Thank you for subscribing!</p>
          <p>Please check your inbox to confirm the subscription!</p>
        </div>
      )}
      {status === "ERROR" && (
        <div>
          <p>Oops, something went wrong...</p>
          <p>
            Please,{" "}
            <button onClick={() => setStatus(null)}>try again.</button>
          </p>
        </div>
      )}
      {status === null && (
        <div>
          <p>
            I&apos;ll be sending an email every time I publish a new post.
          </p>
          {/* It'd be great to learn why tailwind's pb-1 doesn't work in this case */}
          <div style={{paddingBottom: "1em"}}>
            <form onSubmit={handleSubmit}>
              <div className="max-w-sm mx-auto p-1 pr-0 flex flex-wrap items-center gap-2">
                <input type="email"
                       name="email_address"
                       placeholder="yourmail@example.com"
                       className="flex-1 min-w-0 rounded shadow-md p-3 text-grey-dark"
                       onChange={handleEmailChange}
                       value={email}
                />
                <button type="submit"
                        style={{backgroundColor: "#ba3925"}}
                        className="text-white text-base font-semibold rounded-md shadow-md hover:bg-indigo-600 p-3 w-full sm:w-auto">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <p>
            Or, subscribe with <Link href={"/feed.xml"}>
            RSS<FontAwesomeIcon icon={faRss} className="h-3.5 pl-1"/>
          </Link>.
          </p>
        </div>
      )}
    </div>
  )
}
