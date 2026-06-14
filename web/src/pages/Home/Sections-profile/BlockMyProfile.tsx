const BlockMyProfile = () => {
  return (
    <div className="bg-[#1d0a44] mt-5 rounded-xl p-5">
      <h2 className="text-xl mb-4 font-bold">Профіль</h2>

      <div className="flex items-center gap-4">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src="/images/icon/users/profile.png"
          alt=""
        />

        <div>
          <h3 className="text-xl font-semibold">Stas</h3>
          <p>рівень 8</p>
          <p>470/840 XP</p>
        </div>
      </div>

      <div className="border-t border-purple-900 mt-5 ">
        <div className="grid grid-cols-3 mt-5 text-center">
          <div>
            <p className="text-2xl font-bold">7</p>
            <p>днів в поспіль</p>
          </div>

          <div>
            <p className="text-2xl font-bold">954</p>
            <p>балів</p>
          </div>

          <div>
            <p className="text-2xl font-bold">14</p>
            <p>досягнень</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockMyProfile;
