import React from "react";
import BoxButton from "../components/input/BoxButton";
import TextField from "../components/input/TextField";
import ChipButton from "../components/input/ChipButton";
import Label from "../components/property/Label";
import IconItem from "../components/property/IconItem";
import Icon from "../components/property/Icon";
import FullWidjet from "../components/widjet/FullWidjet";
import LargeWidjet from "../components/widjet/LargeWidjet";
import MediumWidjet from "../components/widjet/MediumWidjet";
import SmallWidjet from "../components/widjet/SmallWidjet";
import Dropdown from "../components/property/Dropdown";
import BookCard from "../components/card/BookCard";
import ReviewCard from "../components/card/ReviewCard";
import ProfileCard from "../components/card/ProfileCard";
import NavigationBar from "../components/gnb/NavigationBar";
import Header from "../components/gnb/Header";

function ComponentsGuide() {
    return (
        <div className="min-h-screen bg-blue-50 text-gray-10 p-10 font-['Pretendard']">
            <header className="mb-16 border-b border-gray-80 pb-8">
                <h1 className="text-4xl font-bold mb-4">UI 컴포넌트 가이드</h1>
                <p className="text-gray-40 text-lg">프로젝트의 디자인 시스템 컴포넌트</p>
            </header>

            <main className="flex flex-col gap-24 font-['Pretendard']">
                {/* BoxButton Section */}
                <section id="box-button" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">BoxButton</h2>
                        <p className="text-gray-40">여러 크기와 상태를 가진 표준 버튼 컴포넌트.</p>
                    </div>

                    {/*사용법*/}
                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70 w-full mt-4">
                        <span className="text-xs text-gray-40 italic">사용법:</span>
                        <code className="text-secondary-40 text-xs">
                            {'<BoxButton label="Click Me" size="m" state="enabled" />'}
                        </code>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-90 p-8 rounded-xl border border-gray-80">
                        {/* Sizes */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 underline decoration-secondary-50 underline-offset-4">
                                Sizes
                            </h3>
                            <div className="flex flex-col gap-4 items-start">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-gray-40 italic">
                                        Large (l) - Default
                                    </span>
                                    <BoxButton label="Large Button" size="l" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-gray-40 italic">Medium (m)</span>
                                    <BoxButton label="Medium Button" size="m" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-gray-40 italic">Small (s)</span>
                                    <BoxButton label="Small Button" size="s" />
                                </div>
                            </div>
                        </div>

                        {/* States */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 underline decoration-secondary-50 underline-offset-4">
                                States
                            </h3>
                            <div className="flex flex-col gap-4 items-start">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-gray-40 italic">
                                        Enabled (default)
                                    </span>
                                    <BoxButton label="Enabled State" state="enabled" size="m" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-gray-40 italic">Disabled</span>
                                    <BoxButton label="Disabled State" state="disabled" size="m" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TextField Section */}
                <section id="text-field" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">TextField</h2>
                        <p className="text-gray-40">
                            다양한 검증 상태를 가진 사용자 정의 스타일의 입력 필드.
                        </p>
                    </div>

                    {/*사용법*/}
                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                        <span className="text-xs text-gray-40 italic">사용법:</span>
                        <code className="text-secondary-40 text-xs text-wrap">
                            {'<TextField state="bad" subText="Invalid email" />'}
                        </code>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Enabled
                                </h3>
                                <TextField placeholder="Placeholder" state="enabled" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Focused / Typing
                                </h3>
                                <TextField
                                    placeholder="Focused"
                                    state="focused"
                                    value="User Input"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Disabled
                                </h3>
                                <TextField placeholder="Disabled" state="disabled" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Error (Bad)
                                </h3>
                                <TextField
                                    placeholder="Error"
                                    state="bad"
                                    showSub={true}
                                    subText="Error message"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Success (Good)
                                </h3>
                                <TextField
                                    placeholder="Success"
                                    state="good"
                                    showSub={true}
                                    subText="Success message"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ChipButton Section */}
                <section id="chip-button" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">ChipButton</h2>
                        <p className="text-gray-40">
                            태그, 필터 또는 작은 동작에 사용되는 컴팩트 버튼.
                        </p>
                    </div>

                    {/* 사용법 */}
                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                        <span className="text-xs text-gray-40 italic">사용법:</span>
                        <code className="text-secondary-40 text-xs text-wrap">
                            {'<ChipButton label="Filter" onClick={handleFilter} />'}
                        </code>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80">
                        <div className="flex gap-8 items-center">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Default
                                </h3>
                                <ChipButton
                                    onClick={() => alert("ChipButton clicked!")}
                                    label="Enabled Chip"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Disabled
                                </h3>
                                <ChipButton label="Disabled Chip" disabled={true} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 라벨영역 */}
                <section id="label" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">Label</h2>
                        <p className="text-gray-40">Compact labels for status or categories.</p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                        <span className="text-xs text-gray-40 italic">Usage:</span>
                        <code className="text-secondary-40 text-xs text-wrap">
                            {'<Label label="New" size="s" isActived={true} />'}
                        </code>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80">
                        <div className="flex gap-12 items-center">
                            {/* Small Labels */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Small (s)
                                </h3>
                                <div className="flex gap-4">
                                    <Label label="Active" size="s" isActived={true} />
                                    <Label label="Inactive" size="s" isActived={false} />
                                </div>
                            </div>

                            {/* Medium Labels */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Medium (m)
                                </h3>
                                <div className="flex gap-4">
                                    <Label label="Active" size="m" isActived={true} />
                                    <Label label="Inactive" size="m" isActived={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Icon Section */}
                <section id="icon" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">Icon</h2>
                        <p className="text-gray-40">
                            Container component for icons with standard sizing.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80">
                        <div className="flex gap-12 items-center">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Sizes
                                </h3>
                                <div className="flex items-end gap-4 p-4 bg-gray-95 rounded border border-gray-80">
                                    <div className="flex flex-col items-center gap-2">
                                        <Icon type="BiFilter" size="l" isActived={true} />
                                        <span className="text-xs text-gray-50">L (24px)</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <Icon type="BiFilter" size="m" isActived={true} />
                                        <span className="text-xs text-gray-50">M (20px)</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <Icon type="BiFilter" size="s" isActived={true} />
                                        <span className="text-xs text-gray-50">S (12px)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    States
                                </h3>
                                <div className="flex gap-4 p-4 bg-gray-95 rounded border border-gray-80">
                                    <Icon type="AiFillCheckCircle" size="l" isActived={true} />
                                    <Icon type="AiFillCheckCircle" size="l" isActived={false} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                            <span className="text-xs text-gray-40 italic">Usage:</span>
                            <code className="text-secondary-40 text-xs text-wrap">
                                {'<Icon type="BiFilter" size="m" isActived={true} />'}
                            </code>
                        </div>
                    </div>
                </section>

                {/* Widjet Section */}
                <section id="widjet" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">Widjet</h2>
                        <p className="text-gray-40">Standard widget components.</p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                        <span className="text-xs text-gray-40 italic">Usage:</span>
                        <code className="text-secondary-40 text-xs text-wrap">
                            {'<LargeWidjet type="AiRecommand" />'}
                        </code>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80 overflow-x-auto">
                        <div className="flex flex-wrap gap-8 items-start">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Full
                                </h3>
                                <FullWidjet />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Large
                                </h3>
                                <LargeWidjet type="AiRecommand" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Small
                                </h3>
                                <SmallWidjet type="Graph" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Medium
                                </h3>
                                <MediumWidjet />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dropdown Section */}
                <section id="dropdown" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">Dropdown</h2>
                        <p className="text-gray-40">메뉴 리스트를 보여주는 드롭다운 컴포넌트.</p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                        <span className="text-xs text-gray-40 italic">Usage:</span>
                        <code className="text-secondary-40 text-xs text-wrap">
                            {
                                '<Dropdown items={[{ label: "Edit", iconType: "BiPencil" }]} isOpen={true} />'
                            }
                        </code>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80 overflow-visible">
                        <div className="flex gap-12 items-start h-[200px]">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Default (Open)
                                </h3>
                                <div className="relative">
                                    <Dropdown
                                        isOpen={true}
                                        items={[
                                            {
                                                label: "Edit",
                                                iconType: "BiPencil",
                                                onClick: () => {},
                                            },
                                            {
                                                label: "Delete",
                                                iconType: "BiTrash",
                                                onClick: () => {},
                                            },
                                            {
                                                label: "Share",
                                                iconType: "BiShare",
                                                onClick: () => {},
                                                isActive: true,
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BookCard Section */}
                <section id="book-card" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">BookCard</h2>
                        <p className="text-gray-40">도서 정보를 보여주는 카드 컴포넌트.</p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                        <span className="text-xs text-gray-40 italic">Usage:</span>
                        <code className="text-secondary-40 text-xs text-wrap">
                            {'<BookCard size="l" state="default" book={{ ... }} />'}
                        </code>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80 items-start overflow-x-auto">
                        <div className="flex gap-12 items-start">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Large (Reading)
                                </h3>
                                <BookCard
                                    size="l"
                                    state="default"
                                    book={{
                                        title: "역행자",
                                        author: "자청",
                                        genre: "자기계발",
                                        status: "reading",
                                        totalPage: 300,
                                        currentPage: 120,
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Large (Complete)
                                </h3>
                                <BookCard
                                    size="l"
                                    state="default"
                                    book={{
                                        title: "부자의 그릇",
                                        author: "이즈미 마사토",
                                        genre: "경제경영",
                                        status: "complete",
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                                    Small & Medium
                                </h3>
                                <div className="flex gap-4 items-end">
                                    <BookCard size="m" />
                                    <BookCard size="s" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ReviewCard Section */}
                <section id="review-card" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">ReviewCard</h2>
                        <p className="text-gray-40">사용자 리뷰를 보여주는 카드 컴포넌트.</p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                        <span className="text-xs text-gray-40 italic">Usage:</span>
                        <code className="text-secondary-40 text-xs text-wrap">
                            {'<ReviewCard book={{...}} userName="User" content="..." />'}
                        </code>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80 w-full">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                            Example
                        </h3>
                        <div className="flex flex-row gap-4">
                            <ReviewCard
                                book={{
                                    title: "역행자",
                                    coverImage:
                                        "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788901260716.jpg",
                                }}
                                userName="김독서"
                                date="2026.01.21"
                                content="독후감의 내용 일부분 ..."
                                likeCount={124}
                                isLiked={true}
                            />
                            <ReviewCard
                                book={{
                                    title: "클린 코드",
                                }}
                                userName="DevMaster"
                                date="2026.01.20"
                                likeCount={45}
                                content="클린코드의 내용 일부분 ..."
                                isLiked={false}
                            />
                        </div>
                    </div>
                </section>

                {/* ProfileCard Section */}
                <section id="profile-card" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">ProfileCard</h2>
                        <p className="text-gray-40">사용자 프로필 정보를 보여주는 카드 컴포넌트.</p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                        <span className="text-xs text-gray-40 italic">Usage:</span>
                        <code className="text-secondary-40 text-xs text-wrap">
                            {"<ProfileCard />"}
                        </code>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80 w-full overflow-x-auto">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic">
                            Example
                        </h3>
                        <div className="flex flex-row gap-4">
                            <ProfileCard />
                        </div>
                    </div>
                </section>

                {/* NavigationBar Section */}
                <section id="navigation-bar" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">NavigationBar</h2>
                        <p className="text-gray-40">애플리케이션의 메인 사이드 네비게이션 바.</p>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-8 rounded-xl border border-gray-80 overflow-hidden relative h-[800px]">
                        <div className="absolute left-0 top-0 bottom-0">
                            <NavigationBar />
                        </div>
                        <div className="ml-[340px] text-gray-50 italic">(Content Area)</div>
                    </div>
                </section>

                {/* Header Section */}
                <section id="header" className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">Header</h2>
                        <p className="text-gray-40">페이지 상단 헤더 컴포넌트.</p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 bg-gray-80/30 rounded border border-dashed border-gray-70">
                        <span className="text-xs text-gray-40 italic">Usage:</span>
                        <code className="text-secondary-40 text-xs text-wrap">
                            {'<Header title="Page Title" showSearch={true} />'}
                        </code>
                    </div>

                    <div className="flex flex-col gap-8 bg-gray-90 p-4 rounded-xl border border-gray-80">
                        <div className="flex flex-col gap-4 w-full border border-gray-80 rounded-xl overflow-hidden">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-50 italic p-4">
                                Preview
                            </h3>
                            {/* Mock Layout for Header */}
                            <div className="w-full bg-gray-95 border-t border-gray-80">
                                <Header title="내 서재" showSearch={true} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Future Components Placeholder */}
                <section className="mt-8 pt-8 border-t border-gray-80 opacity-50">
                    <h2 className="text-xl font-medium mb-4">Other Components Coming Soon</h2>
                    <div className="flex gap-4 flex-wrap">
                        {["ChipButton"].map((comp) => (
                            <span
                                key={comp}
                                className="px-3 py-1 bg-gray-90 border border-gray-80 text-gray-50 text-xs rounded-full">
                                {comp}
                            </span>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="mt-32 pt-8 border-t border-gray-80 flex justify-between items-center">
                <span className="text-gray-60 text-sm">© 2026 Project Founders</span>
                <div className="flex gap-6">
                    <a
                        href="#box-button"
                        className="text-xs text-gray-50 hover:text-secondary-50 transition-colors">
                        BoxButton
                    </a>
                    <a
                        href="#text-field"
                        className="text-xs text-gray-50 hover:text-secondary-50 transition-colors">
                        TextField
                    </a>
                    <a
                        href="#dropdown"
                        className="text-xs text-gray-50 hover:text-secondary-50 transition-colors">
                        Dropdown
                    </a>
                    <a
                        href="#book-card"
                        className="text-xs text-gray-50 hover:text-secondary-50 transition-colors">
                        BookCard
                    </a>
                    <a
                        href="#review-card"
                        className="text-xs text-gray-50 hover:text-secondary-50 transition-colors">
                        ReviewCard
                    </a>
                    <a
                        href="#profile-card"
                        className="text-xs text-gray-50 hover:text-secondary-50 transition-colors">
                        ProfileCard
                    </a>
                    <a
                        href="#navigation-bar"
                        className="text-xs text-gray-50 hover:text-secondary-50 transition-colors">
                        NavigationBar
                    </a>
                    <a
                        href="#header"
                        className="text-xs text-gray-50 hover:text-secondary-50 transition-colors">
                        Header
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default ComponentsGuide;
