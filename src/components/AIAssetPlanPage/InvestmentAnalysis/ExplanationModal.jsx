export default function ExplanationModal({
  ModalOpen,
  setModalOpen,
  title,
  description,
  example,
}) {
  if (!ModalOpen) return null;
  return (
    <div
      className="w-[393px] h-[852px] bg-[#171f27a4] absolute top-0 left-0 right-0 bottom-0 mt-6 z-20 translate-0 flex flex-col pt-[285px] items-center"
      onClick={() => setModalOpen(false)}
    >
      <div
        className="flex flex-col gap-[16px] bg-white w-[353px] rounded-[12px] p-[24px]"
        onclick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[16px]">
          <div className="text-gray-100 font-bold text-[18px]">{title}</div>
          <p className="text-gray-100 text-[16px] font-medium">{description}</p>
          <ul className="flex flex-col gap-[4px]">
            {example &&
              example.map((item) => (
                <li
                  key={item}
                  className="text-gray-100 text-[14px] font-medium list-disc ml-[20px]"
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
        <button
          className="text-gray-100 text-[14px] font-bold flex justify-end"
          onClick={() => setModalOpen(false)}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
