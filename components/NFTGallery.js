export default function NFTGallery({ nfts }) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">NFT Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <div key={nft.mint} className="bg-gray-700 p-4 rounded">
              <img src={nft.image} alt={nft.name} className="w-full h-40 object-cover rounded mb-2" />
              <p className="font-bold">{nft.name}</p>
              <p className="text-sm text-gray-300">{nft.collection}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }