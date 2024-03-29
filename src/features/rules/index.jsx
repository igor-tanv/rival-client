import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GiNote from "../contracts/notes/gi-note"
import NoGiNote from "../contracts/notes/nogi-note"


export default function Rules({ }) {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash
    if (hash && document.getElementById(hash.substr(1))) {
      document.getElementById(hash.substr(1)).scrollIntoView({ behavior: "smooth" })
    }
  }, [location.hash])

  return <div className="common-container">
    <h1>Competition Rules</h1>
    <p>Read these rules before you send or accept any matches. They apply to Gi and NoGi.</p>

    <h3>General Rules</h3>
          Note: Competitors, coaches  and referees should all be present least 15 minutes
          before the match starts in order to weigh-in, warm up and discuss the rules below to make sure everyone
          is in agreement.<p>
      <ol>
        <li> No unsportsmanlike conduct will be allowed.  You may be disqualified for
        unsportsmanlike
        conduct. The referee will be shown maximum respect at all times. </li>
        <li> No striking, biting, eye gouging (includes chin to eye), head butting, small joint
        manipulation
        (finger or toe locks), hair pulling, grabbing the windpipe, or ear pulling will be
        permitted.
        </li>
        <li> No slamming allowed. Illegal slamming will be defined as slamming your opponent to
        escape submissions and/or to pass the guard; or standing from the guard and/or jumping from
        a standing position
        to slam your opponent. Slamming will result in an automatic DQ.  Takedowns are NOT
        considered slams, but you must deliver your opponent safely to the mat.</li>
        <li> No infectious skin diseases (such as ringworm, staph, and MRSA) or open wounds will
        be
        permitted.  No lubricants, oils, or lotions of any kind will be permitted on any
        part of the body orclothing.
        </li>
        <li> Competitors will be allowed to continue grappling anywhere on the matted area,
        provided they don’t interfere with another match.  If the competitors near the edge of the mat,
        they will be restarted
        from the same position, unless the referee is unable to duplicate the position for
        anyreason.  In case the referee is unable to duplicate the position, the competitors will restart from a
        standing position.
        </li>
        <li> If a competitor flees the mat area when a submission is locked in and the competitor is
        obviously fleeing to avoid submission, he or she will be automatically disqualified. </li>
        <li> <u>All matches are allowed to be recorded on video</u> just like any other tournament. Anyone who
        interferes with this rule will receive a disqualification (DQ).
        </li>
        <li> Every match must have 1 Referee. This is the responsibility of the hosting school.
        </li>
        <li> The visiting competitor is allowed to bring 1 Coach or Assistant to the match.</li>
        <li> It is the responsibility of the hosting competitor to discuss these rules with his or her
              instructor <u>before sending or accepting the match contract</u>. </li>
        <li> Both competitors must weigh-in before the match starts. It is the responsibility of
        the hosting school to provide a working scale and failure to do so will result in a
        DQ for the host competitor. Either the visiting competitor or their coach/assitant may
              request the scales to be verified by placing a weight on the scale. </li>
        <li> If a competitor does not make the weight outlined in their contract the other
        competitor has the option to reject the match and accept a win by DQ or continue with the
        match.
        </li>
        <li> If a competitor arrives to the match 5 minutes or more past the Match Starting
        Time, the other competitor has the option to reject the
        match and accept a win by DQ or continue with the match.
        </li>
        <li>IF EITHER THE COMPETITOR OR THEIR INSTRUCTOR ATTEMPT TO CHANGE OR FAIL TO HONOR ANY RULES MENTIONED HERE
        THAT COMPETITOR WILL RECEIVE A DQ.</li>
      </ol>
    </p>
    <h3>RULES</h3>
    <NoGiNote />
    <GiNote />
    <p>You are allowed to make changes to the standard rules. For  example: "No leg locks", "Change match to
    IBJJF Rules", "Change match time to 8 minutes" and so on. You must put these changes under "Rule Exceptions"
    when completing the Match Contract form. Rule Exceptions will override the standard rules.
    Once you send the contract, your opponent then has the option to accept or reject the match.
    </p>

    <h3 id="rules">Weight Classes- Gi and NoGi <h5>(Kilograms)</h5></h3>
    <ul>
      <li>Flyweight: 57.5 and under</li>
      <li>Featherweight: 57.6 - 64</li>
      <li>Lightweight: 64.1 - 70</li>
      <li>Welterweight: 70.1 - 76</li>
      <li>Middleweight: 76.1 - 82.3</li>
      <li>Cruiserweight: 82.4 - 88.3</li>
      <li>Light-Heavyweight: 88.4 - 94.3</li>
      <li>Heavyweight: 94.4 - 100.4</li>
      <li>Super-Heavyweight: 100.5 and over</li>
      *For Gi matches competitors must weigh in wearing their Gi
    </ul>
  </div>

}