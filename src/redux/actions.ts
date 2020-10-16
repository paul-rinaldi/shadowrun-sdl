import { KarmaAction } from './karmaActions';
import { LogAction } from './logActions';
import { CharacterAction } from './playerActions'
import { SkillAction } from './skillActions';
import { UploadAction } from "./uploadActions";

export type Action = CharacterAction | UploadAction | SkillAction | KarmaAction | LogAction;