import InfoTooltip from "./InfoToolTip";
import Clipboard from "./Clipboard";

export default function TransactionDetails({ details }) {
  console.log("details of each transaction: ", details);
  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded space-y-3 md:space-y-4 text-sm md:text-base">
      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Transaction Details</h2>
      
      <DetailItem label="Signature" value={details.signature} tooltip="Unique identifier for this transaction" canCopy />
      
      <DetailItem label="From" value={details.from} tooltip="Address that initiated the transaction" canCopy />
      
      <DetailItem
        label="To"
        value={
          Array.isArray(details.to) ? (
            <ul className="list-disc pl-4">
              {details.to.map((address, index) => (
                <li key={index} className="break-all">{address}</li>
              ))}
            </ul>
          ) : (
            details.to
          )
        }
        tooltip="Address(es) that received the transaction"
        canCopy
      />
      
      <DetailItem
        label="Result"
        value={
          <span className={details.success ? "text-green-500" : "text-red-500"}>
            {details.success ? "Success" : "Failure"}
          </span>
        }
      />
      
      <DetailItem label="Timestamp" value={details.timestamp} />
      
      <DetailItem
        label="Fee"
        value={`${details.fee / 1000000000} SOL`}
        tooltip="Cost to process this transaction"
      />
      
      <DetailItem
        label="SOL Transfer Amount"
        value={`${details.balanceChange / 1000000000} SOL`}
      />
      
      {details.tokenTransfer && (
        <DetailItem
          label="Token Transfer"
          value={`${details.tokenTransfer.amount} ${details.tokenTransfer.symbol}`}
          tooltip="Amount and type of token transferred"
        />
      )}
      
      <h3 className="text-lg md:text-xl font-bold mt-4 md:mt-6 mb-2">Instructions</h3>
      <ul className="space-y-2">
        {details.instructions.map((instruction, index) => (
          <li key={index} className="bg-gray-700 p-2 md:p-3 rounded">
            <p className="mb-1">
              <DetailItem label="Program" value={`${instruction.program}`}/>
            </p>
            <p>
              <strong>Data:</strong> <span className="break-all">{instruction.data}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailItem({ label, value, tooltip, canCopy }) {
  return (
    <div className="flex flex-wrap items-start">
      <strong className="mr-1">{label}:</strong>
      <div className="flex-1 break-all flex items-center">
        {value}
        {tooltip && <InfoTooltip content={tooltip} />}
        {canCopy && <Clipboard text={typeof value === 'string' ? value : JSON.stringify(value)} />}
      </div>
    </div>
  );
}