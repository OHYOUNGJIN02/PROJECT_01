import SmallCategoryGraphWidget from "./customWidjet/CategoryGraphWidget";
import SmallGraphWidget from "./customWidjet/GraphWidget";

function SmallWidjet({ type }) {
    const widjetComponents = {
        CategoryGraph: <SmallCategoryGraphWidget />,
        Graph: <SmallGraphWidget />,
    };

    const selectedWidjet = widjetComponents[type] || (
        <div className="w-full h-full flex items-center justify-center text-gray-50">
            {type ? `위젯 타입(${type})을 확인해주세요.` : "Small Widget"}
        </div>
    );

    return (
        <div className="w-[320px] h-fit bg-gray-95 rounded-[12px] px-[24px] py-[16px] flex items-center justify-center">
            {selectedWidjet}
        </div>
    );
}

export default SmallWidjet;
