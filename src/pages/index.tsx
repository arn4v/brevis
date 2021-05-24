const IndexPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      <div className="z-10 w-1/3 bg-white rounded-md shadow-md h-1/5"></div>
      <div className="absolute inset-0 z-0 w-screen h-screen overflow-hidden">
        <img src="/mesh.png" className="object-contain" />
      </div>
      <div className="absolute bottom-0 flex w-full">
        <div className="z-10 flex items-center justify-center py-4 mx-auto rounded-md">
          Made with 💖 by&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://arnavgosain.com"
            className="hover:text-blue-800"
          >
            Arnav Gosain
          </a>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
