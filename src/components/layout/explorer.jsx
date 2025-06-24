import React, { createContext, useContext, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";

const ExplorerContext = createContext();
export const useExplorer = () => useContext(ExplorerContext);

// --- BASE COMPONENT

const Explorer = ({ master, children }) => {
    const { width } = useWindowSize();
    const isMobileView = width < 768;
    const [selectedBlock, setSelectedBlock] = useState(null);

    const showNavigator = !selectedBlock || !isMobileView;
    const showViewer = selectedBlock !== null;

    const childArray = React.Children.toArray(children);

    let navigator = null;
    let viewer = null;
    let emptyState = null;

    childArray.forEach(child => {
        if (child.type === Explorer.Navigator) {
            navigator = child;
        } else if (child.type === Explorer.Viewer) {
            viewer = child;
        } else if (child.type === Explorer.EmptyViewerState) {
            emptyState = child;
        }
    });

    // Fallback empty state
    if (!emptyState) {
        emptyState = (
            <div className="flex flex-1 items-center justify-center h-full text-muted-foreground px-4">
                Please select a block to view it
            </div>
        );
    }

    return (
        <ExplorerContext.Provider value={{ master, selectedBlock, setSelectedBlock, isMobileView }}>
            <div className="flex h-screen w-full bg-background">
                {showNavigator && (
                    <div className={clsx(isMobileView ? "w-full" : "w-1/3", "border-r")}>
                        {navigator}
                    </div>
                )}

                {showViewer && (
                    <div className="flex-1">
                        {viewer}
                    </div>
                )}

                {!showViewer && !isMobileView && emptyState}
            </div>
        </ExplorerContext.Provider>
    );
};


export default Explorer;

//
// ---------- Navigator Section
//

const Navigator = ({ children }) => children;

const NavigatorHeader = ({ children }) => (
    children
);

const NavigatorLeft = ({ children }) => (
    <div className="flex flex-1 items-center gap-2">{children}</div>
);

const NavigatorRight = ({ children }) => (
    <div className="flex items-center gap-2">{children}</div>
);

const NavigatorMobileOnly = ({ children }) => {
    const { isMobileView } = useExplorer();
    return isMobileView ? children : null;
};

const NavigatorDesktopOnly = ({ children }) => {
    const { isMobileView } = useExplorer();
    return !isMobileView ? children : null;
};

const NavigatorBody = () => {
    const { master } = useExplorer();

    return (
        <ScrollArea className="px-4 h-[90vh]">
            <div className="p-2 flex flex-col gap-3">
                {master.map((item) =>
                    item.type === "section" ? (
                        <NavigatorSection key={item.id} data={item} />
                    ) : (
                        <NavigatorBlockGroup key={item.id} data={item} />
                    )
                )}
            </div>
        </ScrollArea>
    );
};

const NavigatorSection = ({ data }) => {
    if (!data?.title && !data?.element) return null;

    return (
        <div className="pt-3">
            {data.title && <h2 className="text-sm font-medium mb-1">{data.title}</h2>}
            {data.element && React.cloneElement(data.element, { meta: data })}
        </div>
    );
};


const NavigatorBlockGroup = ({ data }) => {
    const { setSelectedBlock, selectedBlock } = useExplorer();
    const colClass = data.col ? `grid-cols-${data.col}` : "grid-cols-2";

    return (
        <>
            {(data?.title || data?.description) && (
                <div className="pt-2 space-y-0">
                    {data?.title && <p className="text-sm font-medium">{data.title}</p>}
                    {data?.description && (
                        <p className="text-sm text-muted-foreground">{data.description}</p>
                    )}
                </div>
            )}

            <div className={`grid ${colClass} gap-2`}>
                {data.blocks.map((block) => (
                    <button
                        key={block.id}
                        onClick={() => setSelectedBlock(block)}
                        className={clsx(
                            "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                            selectedBlock?.id === block.id && "bg-muted border border-gray-600"
                        )}
                    >
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center w-full">
                                <div className="overflow-hidden rounded-md aspect-square">
                                    {block.icon}
                                </div>
                                <div className="ml-auto text-xs text-muted-foreground">{block.header ?? ""}</div>
                            </div>
                            <div className="text-sm mt-4">
                                <h3 className="font-medium leading-none whitespace-nowrap">
                                    {block.title}
                                </h3>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
};

//
// ---------- Viewer Section
//

const Viewer = ({ children }) => {
    return <div className="flex h-full w-full flex-col">{children}</div>;
};

const ViewerLeft = ({ children }) => {
    return children;
};

const ViewerLeftNav = () => {
    const { selectedBlock, setSelectedBlock } = useExplorer();
    if (!selectedBlock) return null;

    const { master } = useExplorer();

    const allBlocks = master.filter(
        (item) => item.type === "block"
    ).flatMap(
        (item) => item.blocks ?? []
    );


    const currentIndex = allBlocks.findIndex((block) => block.id === selectedBlock.id);

    const isPrevDisabled = currentIndex <= 0;
    const isNextDisabled = currentIndex >= allBlocks.length - 1;


    const goToPrev = () => {
        if (!isPrevDisabled) {
            setSelectedBlock(allBlocks[currentIndex - 1]);
        }
    };


    const goToNext = () => {
        if (!isNextDisabled) {
            setSelectedBlock(allBlocks[currentIndex + 1]);
        }
    };




    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setSelectedBlock(null)}>
                <X className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                disabled={isPrevDisabled}
                onClick={goToPrev}
            >
                <ArrowLeft className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                disabled={isNextDisabled}
                onClick={goToNext}
            >
                <ArrowRight className="h-4 w-4" />
            </Button>
        </>
    );
}

const ViewerRight = ({ children }) => {
    return <div className="ml-auto">{children}</div>;
};

const ViewerRightMobileOnly = ({ children }) => {
    const { isMobileView } = useExplorer();
    return isMobileView ? <div className="ml-auto">{children}</div> : null;
};

const ViewerRightDesktopOnly = ({ children }) => {
    const { isMobileView } = useExplorer();
    return !isMobileView ? <div className="ml-auto">{children}</div> : null;
};

const ViewerHeader = ({ className }) => {
    const { selectedBlock } = useExplorer();

    return (selectedBlock?.title || selectedBlock?.description) && (
        <>
            <div className={clsx("grid gap-1 min-w-0", className)}>
                <p className="text-sm font-semibold">{selectedBlock?.title}</p>
                <div className="line-clamp-3 text-xs">
                    <p className="text-sm text-muted-foreground">{selectedBlock?.description}</p>
                </div>
            </div>

            <div className="border-t" />
        </>
    )
}

const ViewerContent = ({ children }) => {
    const { selectedBlock } = useExplorer();
    return (
        <>
            {/* ViewerHeader */}
            {children}

            <ScrollArea type="always" className="h-[78vh]">

                {React.cloneElement(selectedBlock.element, { meta: selectedBlock })}
            </ScrollArea>

        </>
    );
};

const EmptyViewerState = ({ children }) => {
    return children
};



Explorer.EmptyViewerState = EmptyViewerState;

Explorer.Navigator = Navigator;
Explorer.NavigatorHeader = NavigatorHeader;
Explorer.NavigatorLeft = NavigatorLeft;
Explorer.NavigatorRight = NavigatorRight;
Explorer.NavigatorBody = NavigatorBody;
Explorer.NavigatorMobileOnly = NavigatorMobileOnly;
Explorer.NavigatorDesktopOnly = NavigatorDesktopOnly;

Explorer.Viewer = Viewer;
Explorer.ViewerLeft = ViewerLeft;
Explorer.ViewerRight = ViewerRight;
Explorer.ViewerLeftNav = ViewerLeftNav;
Explorer.ViewerRightMobileOnly = ViewerRightMobileOnly;
Explorer.ViewerRightDesktopOnly = ViewerRightDesktopOnly;
Explorer.ViewerHeader = ViewerHeader;
Explorer.ViewerContent = ViewerContent;
