import React from 'react';
import PropTypes from 'prop-types';

function Overview(props) {
  return (
    <>
      <h3>OVERVIEW:</h3>
      <p>
        At the beginning of the game, each player is secretly assigned to one of
        three roles: Liberal, Fascist, or Hitler. The Liberals have a majority,
        but they don’t know for sure who anyone is; Fascists must resort to
        secrecy and sabotage to accomplish their goals. Hitler plays for the
        Fascist team, and the Fascists know Hitler’s identity from the outset,
        but Hitler doesn’t know the Fascists and must work to figure them out.
        The Liberals win by enacting five Liberal Policies or killing Hitler.
        The Fascists win by enacting six Fascist Policies, or if Hitler is
        elected Chancellor after three Fascist Policies have been enacted.
        Whenever a Fascist Policy is enacted, the government becomes more
        powerful, and the President is granted a single-use power which must be
        used before the next round can begin. It doesn’t matter what team the
        President is on; in fact, even Liberal players might be tempted to enact
        a Fascist Policy to gain new powers.
      </p>
    </>
  );
}

Overview.propTypes = {};

export default Overview;
