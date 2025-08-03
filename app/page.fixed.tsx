import { BattleCard, type BattleCardProps } from "@/components/battle-card"
import { PdfDownloadButton } from "@/components/pdf-download-button"

const cardData: BattleCardProps[] = [
  // ... existing battle cards ...
];

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen w-full p-4 sm:p-8">
      <PdfDownloadButton />
      <div className="max-w-[1320px] mx-auto">
        {/* Existing sections */}
        <h1 className="text-4xl font-bold text-center mb-8">1. Bonding</h1>
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {cardData.map((card, index) => (
            <BattleCard key={index} {...card} />
          ))}
        </div>
        
        {/* All the other sections */}
        
        {/* Antitrust section */}
        <hr className="my-10 border-t border-gray-300 w-full" />
        <h2 className="text-3xl font-bold text-center mb-8">Antitrust</h2>
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {antitrustCards.map((card, index) => (
            <BattleCard key={index} {...card} />
          ))}
        </div>
        
        {/* Network Effects section */}
        <hr className="my-10 border-t border-gray-300 w-full" />
        <h2 className="text-3xl font-bold text-center mb-8">Network Effects</h2>
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {networkEffectsCards.map((card, index) => (
            <BattleCard key={index} {...card} />
          ))}
        </div>
      </div>
    </main>
  )
}

const networkEffectsCards: BattleCardProps[] = [
  {
    title: "The Search Cost Monopoly",
    titleEmoji: "🔍",
    what: {
      point: "A small amount of friction or \"search cost\" for a customer can transform a perfectly competitive market into a de facto monopoly, allowing sellers to charge significantly higher prices.",
      emoji: "💡",
    },
    why: {
      points: [
        "The \"three coffee shops\" thought experiment demonstrates this: if you only learn the price after walking to the shop (incurring a $1 search cost), each shop gains a local monopoly and can charge you the maximum you're willing to pay.",
        "Conversely, if prices are transparent upfront (on a website), competition immediately drives prices down to their lowest level. The ordering of price discovery vs. cost incurred is critical.",
        "This isn't just theoretical. The high fees charged by ATMs in tourist areas are a real-world example. Because you don't know the fee until you're at the machine, you are captured by the search cost of finding another one.",
      ],
      emoji: "📝",
    },
    how: {
      points: [
        "Audit your sales funnel for friction: Identify every point where a customer must invest time, effort, or money before they learn your final price. This friction gives you pricing power.",
        "Weaponize transparency as a challenger: If you are trying to break into a market, create a platform that provides radical, upfront price transparency to eliminate the incumbents' search cost advantage.",
        "Engineer search costs against competitors: If you are the incumbent, subtly increase the perceived cost (inconvenience, uncertainty, time) for your customers to evaluate alternatives.",
      ],
      emoji: "⚙️",
    },
  },
  {
    title: "The Negative Loop: Why Marketplaces Aren't Winner-Take-All",
    titleEmoji: "🔄",
    what: {
      point: "The growth of a marketplace is always limited by a \"negative loop\"—the fact that more suppliers create more competition among those same suppliers, reducing their individual value.",
      emoji: "💡",
    },
    why: {
      points: [
        "The positive flywheel (more supply -> more demand -> more supply) is only half the story. The often-ignored negative loop is that more Airbnb hosts in Berlin leads to more competition and lower revenue for each individual host.",
        "This supplier congestion is the primary reason most two-sided marketplaces (ride-sharing, food delivery) support multiple competing platforms. When the #1 platform becomes too crowded, new suppliers are incentivized to join the #2 platform for a better chance to earn.",
        "This contrasts with one-sided social networks (like early Instagram), where more users are almost purely beneficial, leading to a stronger winner-take-all dynamic.",
      ],
      emoji: "📝",
    },
    how: {
      points: [
        "Monitor supplier health, not just supply growth: Track metrics like \"revenue per supplier\" or \"rides per driver\" as a leading indicator of platform congestion and churn risk.",
        "Position yourself as the \"un-crowded\" alternative: If you are a challenger, market your platform to suppliers as the place where they can stand out and earn more, specifically targeting those feeling squeezed on the dominant platform.",
        "Build tools for differentiation: To mitigate the negative loop, provide your suppliers with tools to compete on factors other than just price (e.g., quality, specialization, unique services).",
      ],
      emoji: "⚙️",
    },
  },
  {
    title: "Solve the Cold Start by Buying the First Spin",
    titleEmoji: "💫",
    what: {
      point: "Overcoming the initial \"cold start problem\" where a platform has no value because it has no users is not a matter of magic; it's a matter of targeted, temporary subsidies.",
      emoji: "💡",
    },
    why: {
      points: [
        "In the early days, the cost for a user to adopt your platform (learning it, creating a profile) is higher than the value it provides. Subsidies bridge this gap.",
        "An estimated 95% of successful marketplaces solved this problem by \"buying\" one side of the market. Google paid Yahoo to get its search engine in front of users; dating apps often pay the first wave of users to create profiles.",
        "The key is to identify which side of your market is the bottleneck. Uber was supply-constrained (it needed drivers), while the dog-walking platform Rover was demand-constrained (it needed to convince owners to trust the walkers).",
      ],
      emoji: "📝",
    },
    how: {
      points: [
        "Declare your constrained side: Determine whether your growth is limited by a lack of supply or a lack of demand. Focus all subsidy and incentive efforts there.",
        "Frame subsidies as a CAPEX, not OPEX: Treat the money spent acquiring your initial network not as a marketing expense, but as a capital investment in building your platform's core, defensible asset.",
        "Design an exit ramp for subsidies: Plan your subsidy program with clear metrics and milestones that trigger a gradual tapering as the organic flywheel begins to spin on its own.",
      ],
      emoji: "⚙️",
    },
  },
];

const antitrustCards: BattleCardProps[] = [
  {
    title: "Distribution is the Kingmaker",
    titleEmoji: "👑",
    what: {
      point: "Controlling the distribution channel that connects a product to the end-user is often more powerful than having a technically superior product.",
      emoji: "💡",
    },
    why: {
      points: [
        "Google understood early on that controlling the \"middleman\" (like a browser or mobile OS) was critical. It paid AOL, and later Apple, billions annually to be the default search engine, securing query volume regardless of user preference.",
        "Microsoft struggled to get its Bing search engine adopted because it lost control of key distribution points. Google controlled the default on Android, struck an exclusive deal with Apple for the iPhone, and even created its own browser (Chrome) to own the channel.",
        "The inability to get distribution on mobile was a primary factor in Bing's failure to meaningfully compete, demonstrating that even a tech giant can be sidelined without a path to the consumer.",
      ],
      emoji: "📝",
    },
    how: {
      points: [
        "Map your customer's journey: Identify every gatekeeper (e.g., OS, browser, app store, marketplace) that stands between you and your target customer.",
        "Prioritize distribution deals: Dedicate significant business development resources to securing default placements or preferred partnerships with those gatekeepers.",
        "Build or buy your channel: If feasible, consider developing a complementary product that can serve as your own proprietary distribution channel to end-users.",
      ],
      emoji: "⚙️",
    },
  },
  {
    title: "The Ecosystem as a Fortress",
    titleEmoji: "��",
    what: {
      point: "The new antitrust focus is on how acquiring complementary products can illegally lock out rivals and entrench a monopoly.",
      emoji: "💡",
    },
    why: {
      points: [
        "The old view that mergers of complementary products (e.g., a software company buying a hardware company) were always pro-competitive is dead. The new Merger Guidelines explicitly target acquisitions of products that rivals need to compete.",
        "The DOJ's case against Apple alleges that it intentionally degrades the functionality of complementary products it doesn't own (e.g., cross-platform watches, messaging, game streaming) to make it harder for users to switch away from the iPhone, thus softening competition with Android.",
        "Google's acquisitions of DoubleClick (ad tech) and ITA (flight search) were waved through years ago but are now seen as key steps that allowed it to build a fortress and disadvantage competitors who relied on those services.",
      ],
      emoji: "📝",
    },
    how: {
      points: [
        "Scan your value chain for dependencies: Identify any critical inputs, data sources, or distribution channels in your business that are supplied by a single third party. A competitor acquiring that supplier is your key vulnerability.",
        "Leverage regulatory complaints: If a dominant competitor acquires a critical input you rely on, recognize that the modern DOJ and FTC are highly receptive to complaints about this \"vertical foreclosure\" theory of harm.",
        "Assess M&A through a new lens: When evaluating an acquisition target, consider its strategic value in the context of your competitors. Is the target a critical input that your rivals need? Acquiring it is a powerful but now risky strategic move.",
      ],
      emoji: "⚙️",
    },
  },
  {
    title: "Antitrust Law is an Offensive Weapon",
    titleEmoji: "⚔️",
    what: {
      point: "Antitrust is no longer just a defensive compliance issue for large firms; it is a strategic tool that smaller, agile companies can use to challenge anticompetitive behavior by incumbents.",
      emoji: "💡",
    },
    why: {
      points: [
        "Private lawsuits are a potent force. Epic Games sued Apple and won on California's Unfair Competition law, forcing the first-ever change to Apple's App Store business model and demonstrating that even the most powerful firms are vulnerable in court.",
        "Regulators rely on private complaints. Behind the scenes of every major merger or conduct investigation, there is a chorus of customers and smaller competitors providing information to the government, which holds immense power to delay or block deals.",
        "There is broad, bipartisan political motivation to rein in Big Tech, driven by complaints from small businesses in both red and blue states who feel squeezed by platform power.",
      ],
      emoji: "📝",
    },
    how: {
      points: [
        "Document everything: Keep meticulous records of any instance where a dominant platform's actions (e.g., algorithm changes, fee changes, self-preferencing) harm your business and your customers.",
        "Learn the complaint process: Understand that you can file complaints with the DOJ, the FTC, and state attorneys general. They are actively looking for evidence of anticompetitive harm.",
        "Don't go it alone: If you are being harmed by a platform's conduct, it's highly likely others are too. Form coalitions with other affected businesses to amplify your voice with regulators and in potential litigation.",
      ],
      emoji: "⚙️",
    },
  },
  {
    title: "Labor & Hiring is an Antitrust Minefield",
    titleEmoji: "⛏️",
    what: {
      point: "Antitrust laws are now being aggressively applied to labor markets, meaning that anti-competitive behavior related to hiring and wages is a serious criminal and civil risk.",
      emoji: "💡",
    },
    why: {
      points: [
        "Monopsony power—market power held by a buyer—is a major focus of current enforcement. This applies directly to companies as buyers of labor.",
        "The DOJ successfully prosecuted poultry processors who colluded to set wage caps for their factory workers. This is legally equivalent to price-fixing.",
        "Hospital mergers have been shown to suppress wages for nurses because the merged entity becomes the dominant employer in a town and can dictate pay without fear of competition.",
      ],
      emoji: "📝",
    },
    how: {
      points: [
        "Never coordinate on compensation: Do not engage in any formal or informal agreements with competing companies about salaries, benefits, or no-poaching policies. This can be a criminal offense.",
        "Use compensation data carefully: While using compensation consultants is legal, ensure the process does not facilitate explicit or implicit wage-fixing among competitors. The data should be properly anonymized and aggregated.",
        "Assess your local power: If your startup becomes the dominant employer for a specific skill set in your geographic area, be aware that your actions in the labor market (e.g., wage setting, non-competes) will face a higher level of scrutiny.",
      ],
      emoji: "⚙️",
    },
  },
];

// ... other battle card arrays ...
