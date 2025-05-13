import Layout from "../Layout";
import {
  Skull,
  AlertTriangle,
  Ban,
  FileText,
  ShieldAlert,
  DollarSign,
  Hand,
} from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <TermsAndConditions />
    </Layout>
  );
};

const TermsAndConditions = () => {
  return (
    <div className="bg-black text-gray-100 min-h-screen font-mono relative overflow-hidden">
      <style>
        {`
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-1px, 1px); }
            80% { transform: translate(1px, -1px); }
            100% { transform: translate(0); }
          }
          .glitch-hover:hover {
            animation: glitch 0.3s linear infinite;
            filter: blur(1px) brightness(1.2);
            text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000;
          }
        `}
      </style>

      <div className="hero bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <Skull className="text-6xl text-red-600 mb-4 animate-pulse" />
            <h1 className="text-5xl font-extrabold text-red-600 tracking-widest uppercase glitch-hover">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-xl text-gray-300 italic">
              Read carefully... or regret eternally.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10 max-w-5xl mx-auto">
        <div className="card bg-gray-900 shadow-2xl border border-red-700 rounded-2xl">
          <div className="card-body prose max-w-none prose-invert">
            <h2 className="text-red-500 glitch-hover">
              <FileText className="inline mr-2" />
              1. Rental Agreement
            </h2>
            <p>
              By entering this pact, you pledge your soul (and wallet) to care
              for the item until it returns to its rightful master. Fail not...
            </p>

            <h2 className="text-yellow-400 glitch-hover">
              <AlertTriangle className="inline mr-2" />
              2. Responsibility for Damage
            </h2>
            <p>
              Break it, pay it. Damage shall be judged by the owner, and their
              word is final. Appeals will be ignored like whispers in a haunted
              hallway.
            </p>

            <h2 className="text-red-500 glitch-hover">
              <DollarSign className="inline mr-2" />
              3. Payment and Charges
            </h2>
            <ul>
              <li>Pay upfront or the rental vanishes.</li>
              <li>Late? Every second adds to your doom (and bill).</li>
              <li>Damage charges are carved in digital stone — no mercy.</li>
            </ul>

            <h2 className="text-red-600 glitch-hover">
              <ShieldAlert className="inline mr-2" />
              4. Usage Terms
            </h2>
            <p>
              Use items as intended. Summoning demons, illegal stunts, or
              forbidden rituals are strictly forbidden and cursed.
            </p>

            <h2 className="text-yellow-400 glitch-hover">
              <AlertTriangle className="inline mr-2" />
              5. Liability Disclaimer
            </h2>
            <p>
              We are not responsible for injuries, possessions, or hauntings
              resulting from misuse. You have been warned.
            </p>

            <h2 className="text-red-500 glitch-hover">
              <Ban className="inline mr-2" />
              6. Termination
            </h2>
            <p>
              Any violation may result in rental termination, banishment, or
              worse. This agreement may self-destruct upon breaking.
            </p>

            <h2 className="text-red-600 glitch-hover">
              <Hand className="inline mr-2" />
              7. Acceptance
            </h2>
            <p>
              Proceeding means you accept all horrors within. Turn back while
              you can... or click <em>Accept</em> to seal your fate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
