// The root template component.
import { View } from "./View"

// FIXME TODO: Button, Grid, Image, StyleSheet, Switch
import { Link } from "./Link"
import { Nav } from "./Nav"
import { Text } from "./Text"
import { TextInput } from "./TextInput"
import { TextLink } from "./TextLink"
import { Swiper } from "./Swiper"

const exp = {
  // Button: Button, Grid: Grid, Image: Image,
  Link: Link,
  Nav: Nav,
  // StyleSheet: StyleSheet,
  Swiper: Swiper,
  // Switch: Switch,
  Text: Text,
  TextInput: TextInput,
  TextLink: TextLink,
  View: View,
}

export default exp
export {
  // Button, Grid, Image
  Link,
  Nav,
  // StyleSheet,
  Swiper,
  // Switch,
  Text,
  TextInput,
  TextLink,
  View,
}
