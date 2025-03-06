export interface Task {
  id? : number;
  text : String;
  day : String;
  reminder : boolean;
  priority: 'low' | 'medium' | 'high';
}