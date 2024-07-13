import InfoTooltip from "./InfoToolTip";
import Clipboard from "./Clipboard";

export default function TransactionDetails({ details }) {
  console.log("details of each transaction: ", details);
  return (
    <div className="bg-gray-800 p-6 rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
      <p className="flex">
        <strong>Signature:&nbsp;</strong> {details.signature}
        <InfoTooltip content="Unique identifier for this transaction" />
        <Clipboard text={details.signature}/>
      </p>
      <p className="flex">
        <strong>From: &nbsp;</strong> {details.from}
        <InfoTooltip content="Address that initiated the transaction" />
        <Clipboard text={details.from} />
      </p>
      <p className="flex">
        <strong>To: &nbsp;</strong>
        {Array.isArray(details.to) ? (
          <ul>
            {details.to.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        ) : (
          details.to
        )}
        <InfoTooltip content="Address(es) that received the transaction" />
        <Clipboard text={details.to} />
      </p>
      <p>
        <strong>Result: </strong>
        <span className={details.success ? "text-green-500" : "text-red-500"}>
          {details.success ? "Success" : "Failure"}
        </span>
      </p>
      <p>
        <strong>Timestamp: </strong> {details.timestamp}
      </p>
      <p>
        <strong>Fee: </strong> {details.fee / 1000000000} SOL
        <InfoTooltip content="Cost to process this transaction" />
      </p>
      <p>
        <strong>SOL Transfer Amount:</strong>{" "}
        {details.balanceChange / 1000000000} SOL
      </p>
      {details.tokenTransfer && (
        <p>
          <strong>Token Transfer:</strong> {details.tokenTransfer.amount}{" "}
          {details.tokenTransfer.symbol}
          <InfoTooltip content="Amount and type of token transferred" />
        </p>
      )}
      <h3 className="text-xl font-bold mt-6 mb-2">Instructions</h3>
      <ul className="space-y-2">
        {details.instructions.map((instruction, index) => (
          <li key={index} className="bg-gray-700 p-3 rounded">
            <p>
              <strong>Program:</strong> {instruction.program}
            </p>
            <p>
              <strong>Data:</strong> {instruction.data}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
