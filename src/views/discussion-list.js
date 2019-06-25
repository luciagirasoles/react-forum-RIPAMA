import React from "react";
import { Link } from "@reach/router";

function DiscussionList({ discussions }) {
  console.log(discussions);
  if (Object.keys(discussions).length) {
    return (
      <section>
        {Object.values(discussions).map(discussion => (
          <article key={discussion.id}>
            <hr />
            <Link to={`/discussions/${discussion.id}/${discussion.title}`}>
              <h2>{discussion.title}</h2>
            </Link>
            <span>{discussion.author}</span>
          </article>
        ))}
      </section>
    );
  } else {
    return <p>Sorry. We do not messages!</p>;
  }
}

export default DiscussionList;
