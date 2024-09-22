import { PhaseName, PlayType, Stage } from '../Constants';
import { AbilityContext } from './AbilityContext';
import PlayerAction from './PlayerAction';

export type PlayCardContext = AbilityContext & { onPlayCardSource: any };

export abstract class PlayCardAction extends PlayerAction {
    public override meetsRequirements(context = this.createContext(), ignoredRequirements: string[] = []): string {
        if (
            !ignoredRequirements.includes('phase') &&
            context.game.currentPhase !== PhaseName.Action
        ) {
            return 'phase';
        }
        if (
            !ignoredRequirements.includes('cannotTrigger') &&
            !context.source.canPlay(context, PlayType.PlayFromHand)
        ) {
            return 'cannotTrigger';
        }
        return super.meetsRequirements(context, ignoredRequirements);
    }

    public override createContext(player = this.card.controller) {
        return new AbilityContext({
            ability: this,
            game: this.card.game,
            player: player,
            source: this.card,
            stage: Stage.PreTarget,
            costAspects: this.card.aspects
        });
    }

    public override isCardPlayed(): boolean {
        return true;
    }

    public override getAdjustedCost(context) {
        const resourceCost = this.cost.find((cost) => cost.getAdjustedCost);
        return resourceCost ? resourceCost.getAdjustedCost(context) : 0;
    }
}
