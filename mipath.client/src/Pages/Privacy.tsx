import React from "react";

const Privacy: React.FC = () => {
  return (
     <div className="max-w-3xl mx-auto my-8 px-4 prose prose-slate">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <p>
        This app collects only the data necessary for it to function, such as your login email and the tasks you create.
      </p>
      <br/>
      <p>
        All data may be lost at any time. Please do not store critical information.
      </p>
     <br/>
      <p>
        We do not share your data with third parties for advertising or other purposes.
      </p>
     <br/>
      <p>
        If you have questions, please contact us at <a href="mailto:yass.mi2016@gmail.com">yass.mi2016@gmail.com</a>.
      </p>
    </div>
  );
};

export default Privacy;
